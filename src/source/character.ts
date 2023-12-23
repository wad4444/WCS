import { Players, RunService } from "@rbxts/services";
import { Constructor, getActiveHandler, logError, logMessage, logWarning, mapToArray } from "./utility";
import { Janitor } from "@rbxts/janitor";
import { SelectCharacterData } from "state/selectors";
import { GetRegisteredStatusEffectConstructor, StatusData, StatusEffect } from "./statusEffect";
import { FlagWithData, Flags } from "./flags";
import { GetRegisteredSkillConstructor, Skill, SkillData } from "./skill";
import { rootProducer } from "state/rootProducer";
import { WCS_Server } from "./server";
import { remotes } from "./remotes";
import { Moveset } from "./moveset";
import Signal from "@rbxts/signal";

export interface CharacterData {
    instance: Instance;
    statusEffects: Map<string, StatusData>;
    skills: Map<string, SkillData>;
    defaultProps: AffectableHumanoidProps;
}

export interface DamageContainer {
    Damage: number;
    Source: StatusEffect | Skill | undefined;
}

export type AffectableHumanoidProps = Pick<Humanoid, "WalkSpeed" | "JumpPower" | "AutoRotate" | "JumpHeight">;
let nextId = 0;
function generateId() {
    if (RunService.IsClient()) logError(`Why are you trying to call this on client?`);
    nextId++;
    return tostring(nextId);
}

export class Character {
    private static readonly currentCharMap = new Map<Instance, Character>();
    public static readonly CharacterCreated = new Signal<(Character: Character) => void>();
    public static readonly CharacterDestroyed = new Signal<(Character: Character) => void>();

    public readonly Instance: Instance;
    public readonly Humanoid: Humanoid;
    public readonly Player?: Player;

    private readonly janitor = new Janitor();

    public readonly StatusEffectAdded = new Signal<(Status: StatusEffect) => void>();
    public readonly StatusEffectRemoved = new Signal<(Status: StatusEffect) => void>();
    /**
     * Fires only on client
     */
    public readonly HumanoidPropertiesUpdated = new Signal<(NewProperties: AffectableHumanoidProps) => void>();
    /**
     * Container's source will always be nil on client
     */
    public readonly DamageTaken = new Signal<(Container: DamageContainer) => void>();
    public readonly Destroyed = new Signal();

    private readonly statusEffects: Map<string, StatusEffect> = new Map();
    private readonly skills: Map<string, Skill> = new Map();
    private defaultsProps: AffectableHumanoidProps = {
        WalkSpeed: 16,
        JumpPower: 100,
        AutoRotate: true,
        JumpHeight: 7.2,
    };
    private id;
    private moveset?: Moveset;

    constructor(Instance: Instance);
    /**
     * @internal Reserved for internal usage
     */
    constructor(Instance: Instance, canCreateClient: FlagWithData<string>);
    constructor(Instance: Instance, canCreateClient?: FlagWithData<string>) {
        if (RunService.IsClient() && canCreateClient?.flag !== Flags.CanCreateCharacterClient) {
            logError(
                `Attempted to manually create a character on client. \n On client side character are created by the handler automatically, \n doing this manually can lead to a possible desync`,
            );
        }

        if (Character.currentCharMap.get(Instance)) {
            logError(`Attempted to create 2 different characters over a same instance.`);
        }

        if (!getActiveHandler()) {
            logError(`Attempted to instantiate a character before server has started.`);
        }

        const humanoid = Instance.FindFirstChildOfClass("Humanoid");
        if (!humanoid) {
            logError(`Attempted to instantiate a character over an instance without humanoid.`);
            error(``);
        }

        this.Instance = Instance;
        this.Humanoid = humanoid;
        this.Player = Players.GetPlayerFromCharacter(this.Instance);
        this.id = canCreateClient?.data || generateId();

        Character.currentCharMap.set(Instance, this);
        Character.CharacterCreated.Fire(this);

        this.setupReplication_Client();

        this.janitor.Add(this.StatusEffectAdded.Connect(() => this.updateHumanoidProps()));
        this.janitor.Add(this.StatusEffectRemoved.Connect(() => this.updateHumanoidProps()));
        this.janitor.Add(() => {
            this.StatusEffectAdded.Destroy();
            this.StatusEffectRemoved.Destroy();
            this.HumanoidPropertiesUpdated.Destroy();
        });

        if (RunService.IsServer()) {
            rootProducer.setCharacterData(this.id, this._packData());

            const server = getActiveHandler<WCS_Server>()!;
            this.janitor.Add(
                this.DamageTaken.Connect((Container) => {
                    Players.GetPlayers().forEach((Player) => {
                        if (!server.FilterReplicatedCharacters(Player, this)) return;
                        remotes._damageTaken.fire(Player, this.id, Container.Damage);
                    });
                }),
            );
        }
    }

    public GetId() {
        return this.id;
    }

    /**
     * Destroys the object and performs necessary cleanup tasks.
     * You usually suppost to fire this manually when your humanoid dies.
     */
    public Destroy() {
        Character.currentCharMap.delete(this.Instance);
        if (RunService.IsServer()) {
            rootProducer.deleteCharacterData(this.id);
        }

        Character.CharacterDestroyed.Fire(this);
        this.skills.forEach((Skill) => Skill.Destroy());
        this.statusEffects.forEach((Status) => Status.Destroy());

        this.Destroyed.Fire();
        this.janitor.Cleanup();
    }

    /**
     * @returns The damage that was actually taken.
     */
    public TakeDamage(Container: DamageContainer) {
        if (RunService.IsClient()) {
            logWarning(`Cannot use :TakeDamage() on client`);
            return;
        }

        const originalDamage = Container.Damage;
        let modifiedDamage = originalDamage;
        this.statusEffects.forEach((Status) => {
            modifiedDamage = Status.HandleDamage(modifiedDamage, originalDamage);
        });

        const container = {
            ...Container,
            Damage: modifiedDamage,
        };

        this.DamageTaken.Fire(container);
        return container;
    }

    /**
     * @internal Reserved for internal usage
     */
    public _addStatus(Status: StatusEffect) {
        this.statusEffects.set(Status.GetId(), Status);
        this.StatusEffectAdded.Fire(Status);

        const humanoidDataChanged = Status.HumanoidDataChanged.Connect(() => this.updateHumanoidProps());
        const stateChanged = Status.StateChanged.Connect(() => {
            this.updateHumanoidProps();
        });

        Status.Destroyed.Once(() => {
            humanoidDataChanged?.Disconnect();
            stateChanged?.Disconnect();

            this.statusEffects.delete(Status.GetId());
            this.StatusEffectRemoved.Fire(Status);
            this.updateHumanoidProps();
        });
    }

    /**
     * @internal Reserved for internal usage
     */
    public _addSkill(Skill: Skill) {
        const name = Skill.GetName();
        if (this.skills.has(name)) {
            logError(`Skill with name ${name} is already registered for character ${this.Instance}`);
        }

        this.skills.set(name, Skill);
        Skill.Destroyed.Once(() => {
            this.skills.delete(name);
        });
    }

    /**
     * @internal Reserved for internal usage
     */
    public _packData(): CharacterData {
        const packedStatusEffect = new Map<string, StatusData>();
        this.statusEffects.forEach((Status, Id) => packedStatusEffect.set(Id, Status._packData()));

        return {
            instance: this.Instance,
            statusEffects: packedStatusEffect,
            defaultProps: this.defaultsProps,
            skills: new Map(),
        };
    }

    public SetDefaultProps(Props: AffectableHumanoidProps) {
        this.defaultsProps = Props;
        if (RunService.IsServer()) {
            rootProducer.patchCharacterData(this.id, {
                defaultProps: Props,
            });
        }
    }

    /**
     * This function returns the default humanoid properties of the character.
     */
    public GetDefaultsProps() {
        return table.clone(this.defaultsProps);
    }

    /**
     * Returns the map of all characters to their instances.
     */
    public static GetCharacterMap_TS() {
        return table.clone(Character.currentCharMap) as ReadonlyMap<Instance, Character>;
    }

    /**
     * @internal Reserved for internal usage
     */
    public static GetCharacterFromId_TS(Id: string) {
        for (const [_, Character] of pairs(this.currentCharMap)) {
            if (Character.GetId() === Id) {
                return Character;
            }
        }
    }

    /**
     * Retrieves the character associated with the given instance.
     */
    public static GetCharacterFromInstance_TS(Instance: Instance) {
        return Character.currentCharMap.get(Instance);
    }

    /**
     * @internal Reserved for LuaU usage
     */
    public GetCharacterMap(this: void) {
        return table.clone(Character.currentCharMap) as ReadonlyMap<Instance, Character>;
    }

    /**
     * @internal Reserved for LuaU usage
     */
    public GetCharacterFromInstance(this: void, Instance: Instance) {
        return Character.currentCharMap.get(Instance);
    }

    /**
     * Retrieves all status effects.
     */
    public GetAllStatusEffects() {
        return mapToArray(this.statusEffects);
    }

    /**
     * Retrieves all active status effects.
     */
    public GetAllActiveStatusEffects() {
        return mapToArray(this.statusEffects).filter((T) => T.GetState().IsActive);
    }

    /**
     * Retrieves all status effects of a given type.
     */
    public GetAllStatusEffectsOfType<T extends object>(Constructor: Constructor<T>) {
        return mapToArray(this.statusEffects).filter((T) => tostring(getmetatable(T)) === tostring(Constructor));
    }

    /**
     * Retrieves all active status effects of a specific type.
     */
    public GetAllActiveStatusEffectsOfType<T extends object>(Constructor: Constructor<T>) {
        return mapToArray(this.statusEffects).filter(
            (T) => tostring(getmetatable(T)) === tostring(Constructor) && T.GetState().IsActive,
        );
    }

    /**
     * Checks if character has any active status effects of the speicified type.
     */
    public HasStatusEffects(Constructors: Constructor<StatusEffect>[]) {
        for (const [_, Effect] of pairs(this.statusEffects)) {
            if (!Effect.GetState().IsActive) continue;
            if (Constructors.find((T) => tostring(T) === tostring(getmetatable(Effect)))) return true;
        }
        return false;
    }

    /**
     * Retrieves a skill from the skills map based on a given name.
     */
    public GetSkillFromString(Name: string) {
        return this.skills.get(Name);
    }

    /**
     * Retrieves a skill instance from the skills map based on the provided constructor.
     */
    public GetSkillFromConstructor<T extends Constructor<Skill>>(Constructor: T) {
        return this.skills.get(tostring(Constructor));
    }

    /**
     * Apply a moveset to the character.
     */
    public ApplyMoveset(Moveset: Moveset) {
        if (!RunService.IsServer()) {
            logWarning(`Attempted to apply moveset on client`);
            return;
        }

        if (this.moveset) {
            this.moveset.Skills.forEach((SkillConstructor) => {
                const name = tostring(SkillConstructor);
                this.skills.get(name)?.Destroy();
            });
        }

        Moveset.Skills.forEach((SkillConstructor) => {
            const name = tostring(SkillConstructor);
            this.skills.get(name)?.Destroy();

            new SkillConstructor(this as never);
        });
        this.moveset = Moveset;
    }

    /**
     * Retrieves the moveset.
     */
    public GetMoveset() {
        return this.moveset;
    }

    /**
     * Clears the moveset and destroys all skills.
     */
    public ClearMoveset() {
        if (!RunService.IsServer()) {
            logWarning(`Attempted to clear moveset on client`);
            return;
        }
        if (!this.moveset) return;

        this.moveset.Skills.forEach((SkillConstructor) => {
            const name = tostring(SkillConstructor);
            this.skills.get(name)?.Destroy();
        });
        this.moveset = undefined;
    }

    /**
     * Apply the skills from a given Moveset.
     * Does not set the moveset and just applies the skills.
     */
    public ApplySkillsFromMoveset(Moveset: Moveset) {
        Moveset.Skills.forEach((SkillConstructor) => {
            const name = tostring(SkillConstructor);
            this.skills.get(name)?.Destroy();

            new SkillConstructor(this as never);
        });
    }

    private setupReplication_Client() {
        if (!RunService.IsClient()) return;
        if (!getActiveHandler()) return;

        const processStatusAddition = (Data: StatusData, Id: string) => {
            const constructor = GetRegisteredStatusEffectConstructor(Data.className);
            if (!constructor) {
                logError(
                    `Replication Error: Could not find a registered StatusEffect with name ${Data.className}. \n Try doing :RegisterDirectory() on the file directory.`,
                );
            }

            new constructor!(
                this as never,
                {
                    flag: Flags.CanAssignCustomId,
                    data: Id,
                } as never,
            );
        };

        const proccessSkillAddition = (Data: SkillData, Name: string) => {
            const constructor = GetRegisteredSkillConstructor(Name);
            if (!constructor) {
                logError(
                    `Replication Error: Could not find a registered Skill with name ${Name}. \n Try doing :RegisterDirectory() on the file directory.`,
                );
            }

            new constructor!(this as never, Flags.CanInstantiateSkillClient as never);
        };

        const proccessDataUpdate = (CharacterData: CharacterData | undefined) => {
            if (!CharacterData) return;

            CharacterData.statusEffects.forEach((StatusData, Id) => {
                if (!this.statusEffects.has(Id)) {
                    processStatusAddition(StatusData, Id);
                }
            });

            this.statusEffects.forEach((Status, Id) => {
                if (!CharacterData.statusEffects.has(Id)) {
                    Status.Destroy();
                    this.StatusEffectRemoved.Fire(Status);
                }
            });

            CharacterData.skills.forEach((SkillData, Name) => {
                if (!this.skills.has(Name)) {
                    proccessSkillAddition(SkillData, Name);
                }
            });

            this.skills.forEach((Skill, Name) => {
                if (!CharacterData.skills.has(Name)) {
                    Skill.Destroy();
                }
            });

            if (CharacterData.defaultProps !== this.defaultsProps) this.SetDefaultProps(CharacterData.defaultProps);
        };

        const dataSelector = SelectCharacterData(this.GetId());
        const disconnect = rootProducer.subscribe(dataSelector, proccessDataUpdate);
        proccessDataUpdate(dataSelector(rootProducer.getState()));

        this.janitor.Add(disconnect);
        this.updateHumanoidProps();
    }

    private updateHumanoidProps() {
        if (RunService.IsServer() && this.Player) return;

        const statuses: StatusEffect[] = [];
        this.statusEffects.forEach((Status) => {
            if (Status.GetHumanoidData() && Status.GetState().IsActive) {
                statuses.push(Status);
            }
        });

        const propsToApply = this.GetDefaultsProps();
        const incPriorityList: Record<keyof AffectableHumanoidProps, number> = {
            WalkSpeed: 0,
            JumpPower: 0,
            AutoRotate: 0,
            JumpHeight: 0,
        };

        let previousSetMPriority: number | undefined = undefined;
        statuses.forEach((StatusEffect) => {
            const humanoidData = StatusEffect.GetHumanoidData();
            if (!humanoidData) return;

            const mode = humanoidData.Mode;
            const priority = humanoidData.Priority;
            if (mode === "Increment" && !previousSetMPriority) {
                for (const [PropertyName, Value] of pairs(humanoidData.Props)) {
                    if (typeIs(Value, "number")) {
                        propsToApply[PropertyName] = (Value + propsToApply[PropertyName as never]) as never;
                    } else if (priority > incPriorityList[PropertyName]) {
                        propsToApply[PropertyName as never] = Value as never;
                        incPriorityList[PropertyName] = priority;
                    }
                }
            } else if (mode === "Set" && (!previousSetMPriority || priority > previousSetMPriority)) {
                previousSetMPriority = priority;
                for (const [PropertyName, Value] of pairs(humanoidData.Props)) {
                    propsToApply[PropertyName as never] = Value as never;
                }
            }
        });

        this.HumanoidPropertiesUpdated.Fire(propsToApply);
        for (const [PropertyName, Value] of pairs(propsToApply)) {
            this.Humanoid[PropertyName as never] = Value as never;
        }
    }
}
