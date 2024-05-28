import { Players } from "@rbxts/services";
import {
    Constructor,
    getActiveHandler,
    isClientContext,
    isServerContext,
    logError,
    logWarning,
    mapToArray,
} from "./utility";
import { Janitor } from "@rbxts/janitor";
import { SelectCharacterData, SelectSkills, SelectStatuses } from "state/selectors";
import {
    AnyStatus,
    GetRegisteredStatusEffectConstructor,
    StatusData,
    StatusEffect,
    UnknownStatus,
} from "./statusEffect";
import { FlagWithData, Flags } from "./flags";
import { AnySkill, GetRegisteredSkillConstructor, SkillData, UnknownSkill } from "./skill";
import { rootProducer } from "state/rootProducer";
import { WCS_Server } from "./server";
import { ServerEvents } from "./networking";
import { GetMovesetObjectByName, Moveset } from "./moveset";
import Signal from "@rbxts/signal";

export interface CharacterData {
    instance: Instance;
    statusEffects: Map<string, StatusData>;
    skills: Map<string, SkillData>;
    moveset: string | undefined;
    defaultProps: AffectableHumanoidProps;
}

export interface DamageContainer {
    Damage: number;
    Source: UnknownStatus | UnknownSkill | undefined;
}

export type AffectableHumanoidProps = Pick<Humanoid, "WalkSpeed" | "JumpPower" | "AutoRotate" | "JumpHeight">;
let nextId = 0;
function generateId() {
    if (isClientContext()) logError(`Why are you trying to call this on client?`);
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

    public readonly SkillAdded = new Signal<(Status: UnknownSkill) => void>();
    public readonly SkillRemoved = new Signal<(Status: UnknownSkill) => void>();

    public readonly StatusEffectAdded = new Signal<(Status: UnknownStatus) => void>();
    public readonly StatusEffectRemoved = new Signal<(Status: UnknownStatus) => void>();
    /**
     * Fires only on client if the character belongs to a player
     */
    public readonly HumanoidPropertiesUpdated = new Signal<(NewProperties: AffectableHumanoidProps) => void>();
    /**
     * Container's source will always be nil on client
     */
    public readonly DamageTaken = new Signal<(Container: DamageContainer) => void>();
    /**
     * Enemy will always be nil on client
     */
    public readonly DamageDealt = new Signal<(Enemy: Character | undefined, Container: DamageContainer) => void>();

    public readonly Destroyed = new Signal();
    public readonly MovesetChanged = new Signal<
        (NewMoveset: string | undefined, OldMoveset: string | undefined) => void
    >();

    private readonly statusEffects: Map<string, UnknownStatus> = new Map();
    private readonly skills: Map<string, UnknownSkill> = new Map();
    private defaultProps: AffectableHumanoidProps = {
        WalkSpeed: 16,
        JumpPower: 50,
        AutoRotate: true,
        JumpHeight: 7.2,
    };
    private id;
    private moveset?: string;
    private destroyed = false;

    constructor(Instance: Instance);
    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    constructor(Instance: Instance, canCreateClient: FlagWithData<string>);
    constructor(Instance: Instance, canCreateClient?: FlagWithData<string>) {
        if (isClientContext() && canCreateClient?.flag !== Flags.CanCreateCharacterClient) {
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
            this.SkillAdded.Destroy();
            this.SkillRemoved.Destroy();
            this.HumanoidPropertiesUpdated.Destroy();
            this.DamageDealt.Destroy();
            this.DamageTaken.Destroy();
        });

        if (isServerContext()) {
            rootProducer.setCharacterData(this.id, this._packData());

            const server = getActiveHandler<WCS_Server>()!;
            this.DamageTaken.Connect((Container) => {
                Players.GetPlayers().forEach((Player) => {
                    if (!server._filterReplicatedCharacters(Player, this)) return;
                    ServerEvents.damageTaken.fire(Player, this.id, Container.Damage);
                });
            });
            this.DamageDealt.Connect((_, Container) => {
                Players.GetPlayers().forEach((Player) => {
                    if (!server._filterReplicatedCharacters(Player, this)) return;
                    ServerEvents.damageDealt.fire(
                        Player,
                        this.id,
                        Container.Source!.GetId(),
                        Container.Source! instanceof StatusEffect ? "Status" : "Skill",
                        Container.Damage,
                    );
                });
            });
        }
    }

    /** @hidden @internal */
    public GetId() {
        return this.id;
    }

    /**
     * Destroys the object and performs necessary cleanup tasks.
     * You usually suppost to fire this manually when your humanoid dies.
     */
    public Destroy() {
        Character.currentCharMap.delete(this.Instance);
        if (isServerContext()) {
            rootProducer.deleteCharacterData(this.id);
        }

        Character.CharacterDestroyed.Fire(this);
        this.skills.forEach((Skill) => Skill.Destroy());
        this.statusEffects.forEach((Status) => Status.Destroy());

        this.Destroyed.Fire();
        this.janitor.Cleanup();
        this.destroyed = true;
    }

    public IsDestroyed() {
        return this.destroyed;
    }

    /**
     * @returns The damage that was actually taken.
     */
    public TakeDamage(Container: DamageContainer) {
        if (isClientContext()) {
            logError(`Cannot use :TakeDamage() on client`);
        }

        const modifiedDamage = this.PredictDamage(Container).Damage;

        const container = {
            ...Container,
            Damage: modifiedDamage,
        };

        this.DamageTaken.Fire(container);
        Container.Source?.Character.DamageDealt.Fire(this, container);
        return container;
    }

    /** Predicts the estimated damage in health after the status effect appliement */
    public PredictDamage(Container: DamageContainer) {
        if (isClientContext()) {
            logError(`Cannot use :TakeDamage() on client`);
        }

        const originalDamage = Container.Damage;
        let modifiedDamage = originalDamage;

        this.GetAllActiveStatusEffects()
            .sort((a, b) => a.GetModificationPriority() < b.GetModificationPriority())
            .forEach((Status) => {
                modifiedDamage = Status.HandleDamage(modifiedDamage, originalDamage);
            });

        const container = {
            ...Container,
            Damage: modifiedDamage,
        };
        return container;
    }

    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    public _addStatus(Status: AnyStatus) {
        this.statusEffects.set(Status.GetId(), Status);
        this.StatusEffectAdded.Fire(Status);

        Status.HumanoidDataChanged.Connect(() => this.updateHumanoidProps());
        Status.StateChanged.Connect(() => {
            this.updateHumanoidProps();
        });

        Status.Destroyed.Connect(() => {
            this.statusEffects.delete(Status.GetId());
            this.StatusEffectRemoved.Fire(Status);
            this.updateHumanoidProps();
        });
    }

    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    public _addSkill(Skill: AnySkill) {
        const name = Skill.GetName();
        if (this.skills.has(name)) {
            logError(`Skill with name ${name} is already registered for character ${this.Instance}`);
        }

        this.skills.set(name, Skill);
        Skill.Destroyed.Connect(() => {
            this.skills.delete(name);
            this.SkillRemoved.Fire(Skill);
        });

        this.SkillAdded.Fire(Skill);
    }

    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    public _packData(): CharacterData {
        const packedStatusEffect = new Map<string, StatusData>();
        this.statusEffects.forEach((Status, Id) => packedStatusEffect.set(Id, Status._packData()));

        return {
            instance: this.Instance,
            statusEffects: packedStatusEffect,
            defaultProps: this.defaultProps,
            moveset: this.moveset,
            skills: new Map(),
        };
    }

    public SetDefaultProps(Props: AffectableHumanoidProps) {
        this.defaultProps = Props;
        table.freeze(this.defaultProps);
        if (isServerContext()) {
            rootProducer.patchCharacterData(this.id, {
                defaultProps: Props,
            });
            rootProducer.flush();
        }
    }

    /**
     * This function returns the default humanoid properties of the character.
     */
    public GetDefaultProps() {
        return this.defaultProps;
    }

    /**
     * Returns the map of all characters to their instances.
     */
    public static GetCharacterMap(this: void) {
        return table.freeze(table.clone(Character.currentCharMap)) as ReadonlyMap<Instance, Character>;
    }

    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    public static GetCharacterFromId(this: void, Id: string) {
        for (const [_, _Character] of pairs(Character.currentCharMap)) {
            if (_Character.GetId() === Id) {
                return _Character;
            }
        }
    }

    /**
     * Retrieves the character associated with the given instance.
     */
    public static GetCharacterFromInstance(this: void, Instance: Instance) {
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
    public GetAllStatusEffectsOfType<T extends AnyStatus>(Constructor: Constructor<T>) {
        return mapToArray(this.statusEffects).filter((T) => tostring(getmetatable(T)) === tostring(Constructor)) as T[];
    }

    /**
     * Retrieves all active status effects of a specific type.
     */
    public GetAllActiveStatusEffectsOfType<T extends AnyStatus>(Constructor: Constructor<T>) {
        return mapToArray(this.statusEffects).filter(
            (T) => tostring(getmetatable(T)) === tostring(Constructor) && T.GetState().IsActive,
        ) as T[];
    }

    /**
     * Checks if character has any active status effects of the specified type.
     */
    public HasStatusEffects(Constructors: Constructor<AnyStatus>[]) {
        for (const [_, Effect] of pairs(this.statusEffects)) {
            if (!Effect.GetState().IsActive) continue;
            if (Constructors.find((T) => tostring(T) === tostring(getmetatable(Effect)))) return true;
        }
        return false;
    }

    /**
     * Retrieves the skills stored in the skills object and returns them as an array.
     */
    public GetSkills() {
        return mapToArray(this.skills);
    }

    /**
     * Retrieves all active skills.
     */
    public GetAllActiveSkills() {
        return mapToArray(this.skills).filter((T) => T.GetState().IsActive);
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
    public GetSkillFromConstructor<T extends UnknownSkill>(Constructor: Constructor<T>) {
        return this.skills.get(tostring(Constructor)) as T | undefined;
    }

    /**
     * Apply a moveset to the character.
     */
    public ApplyMoveset(Moveset: string): void;
    public ApplyMoveset(Moveset: Moveset): void;
    public ApplyMoveset(Moveset: Moveset | string) {
        if (!isServerContext()) {
            logWarning(`Attempted to apply moveset on client`);
            return;
        }
        const movesetObject = typeIs(Moveset, "string") ? GetMovesetObjectByName(Moveset) : Moveset;
        if (!movesetObject) {
            logError(`The provided moveset is invalid`);
        }
        if (movesetObject.Name === this.moveset) return;

        this.cleanupMovesetSkills();

        movesetObject.Skills.forEach((SkillConstructor) => {
            new SkillConstructor(this as never);
        });

        const oldMoveset = this.moveset;
        this.setMovesetServer(movesetObject.Name);

        this.MovesetChanged.Fire(movesetObject.Name, oldMoveset);
    }

    /**
     * Returns the current moveset name.
     */
    public GetMoveset() {
        return this.moveset;
    }

    /**
     * Gets the skills that belong to a provided moveset.
     * Default - Currently applied moveset
     */
    public GetMovesetSkills(Moveset: string | undefined = this.moveset) {
        if (!Moveset) return;

        const movesetObject = GetMovesetObjectByName(Moveset);
        if (!movesetObject) return;

        const skills: AnySkill[] = [];
        this.skills.forEach((Skill) => {
            if (movesetObject.Skills.find((T) => tostring(T) === tostring(getmetatable(Skill)))) {
                skills.push(Skill);
            }
        });

        return skills;
    }

    /**
     * Clears the moveset and destroys all skills.
     */
    public ClearMoveset() {
        if (!isServerContext()) {
            logError(`Attempted to clear moveset on client`);
        }
        if (!this.moveset) return;

        this.cleanupMovesetSkills();

        const oldMoveset = this.moveset;
        this.setMovesetServer(undefined);

        this.MovesetChanged.Fire(this.moveset, oldMoveset);
    }

    private setMovesetServer(to?: string) {
        this.moveset = to;
        rootProducer.patchCharacterData(this.id, {
            moveset: this.moveset,
        });
        rootProducer.flush();
    }

    private cleanupMovesetSkills() {
        if (!this.moveset) return;

        const movesetObject = GetMovesetObjectByName(this.moveset);
        if (!movesetObject) return;

        movesetObject.Skills.forEach((SkillConstructor) => {
            const name = tostring(SkillConstructor);
            this.skills.get(name)?.Destroy();
            this.skills.delete(name);
        });
    }

    /**
     * Apply the skills from a given Moveset.
     * Does not set the moveset and just applies the skills.
     */
    public ApplySkillsFromMoveset(Moveset: Moveset) {
        Moveset.Skills.forEach((SkillConstructor) => {
            const name = tostring(SkillConstructor);
            this.skills.get(name)?.Destroy();
            this.skills.delete(name);

            new SkillConstructor(this as never);
        });
    }

    private statusObserver(Data: StatusData, Id: string) {
        const constructor = GetRegisteredStatusEffectConstructor(Data.className);
        if (!constructor) {
            logError(
                `Replication Error: Could not find a registered StatusEffect with name ${Data.className}. \n Try doing :RegisterDirectory() on the file directory.`,
            );
        }

        const status = new constructor!(
            {
                Character: this,
                Flag: {
                    flag: Flags.CanAssignCustomId,
                    data: Id,
                },
            } as never,
            ...(Data.constructorArgs as never[]),
        );

        return () => {
            status.Destroy();
        };
    }

    private skillObserver(Data: SkillData, Name: string) {
        const constructor = GetRegisteredSkillConstructor(Name);
        if (!constructor) {
            logError(
                `Replication Error: Could not find a registered Skill with name ${Name}. \n Try doing :RegisterDirectory() on the file directory.`,
            );
        }

        const skill = new constructor!(
            {
                Character: this,
                Flag: Flags.CanInstantiateSkillClient,
            } as never,
            ...(Data.constructorArguments as never[]),
        );

        return () => {
            skill.Destroy();
        };
    }

    private setupReplication_Client() {
        if (!isClientContext()) return;
        if (!getActiveHandler()) return;

        const processMovesetChange = (New: string | undefined, Old: string | undefined) => {
            this.moveset = New;
            this.MovesetChanged.Fire(New, Old);
        };

        const processDataUpdate = (CharacterData: CharacterData | undefined) => {
            if (!CharacterData) return;

            if (CharacterData.moveset !== this.moveset) processMovesetChange(CharacterData.moveset, this.moveset);
            if (CharacterData.defaultProps !== this.defaultProps) this.SetDefaultProps(CharacterData.defaultProps);
        };

        this.janitor.Add(
            rootProducer.observe(
                SelectStatuses(this.GetId()),
                (_, index) => index,
                (item, id) => this.statusObserver(item, id),
            ),
        );

        this.janitor.Add(
            rootProducer.observe(
                SelectSkills(this.GetId()),
                (_, index) => index,
                (Data, Name) => this.skillObserver(Data, Name),
            ),
        );

        const dataSelector = SelectCharacterData(this.GetId());
        const disconnect = rootProducer.subscribe(dataSelector, processDataUpdate);
        processDataUpdate(dataSelector(rootProducer.getState()));

        this.janitor.Add(disconnect);
        this.updateHumanoidProps();
    }

    private updateHumanoidProps() {
        if (isServerContext() && this.Player) return;

        const statuses: UnknownStatus[] = [];
        this.statusEffects.forEach((Status) => {
            if (Status.GetHumanoidData() && Status.GetState().IsActive) {
                statuses.push(Status);
            }
        });

        const propsToApply = this.GetDefaultProps();
        const incPriorityList: Record<keyof AffectableHumanoidProps, number> = {
            WalkSpeed: 0,
            JumpPower: 0,
            AutoRotate: 0,
            JumpHeight: 0,
        };

        statuses.forEach((StatusEffect) => {
            const humanoidData = StatusEffect.GetHumanoidData();
            if (!humanoidData) return;

            const priority = humanoidData.Priority;
            for (const [PropertyName, PropertyData] of pairs(humanoidData.Props)) {
                if (PropertyData[1] === "Increment") {
                    propsToApply[PropertyName] = (PropertyData[0] + propsToApply[PropertyName as never]) as never;
                } else if (priority > incPriorityList[PropertyName]) {
                    propsToApply[PropertyName as never] = PropertyData[0] as never;
                    incPriorityList[PropertyName] = priority;
                }
            }
        });

        this.HumanoidPropertiesUpdated.Fire(propsToApply);
        for (const [PropertyName, Value] of pairs(propsToApply)) {
            this.Humanoid[PropertyName as never] = Value as never;
        }
    }
}
