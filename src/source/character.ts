import { RunService } from "@rbxts/services";
import { Constructor, getActiveHandler, logError, logMessage, mapToArray } from "./utility";
import { Janitor } from "@rbxts/janitor";
import { rootProducer } from "state/rootProducer";
import { SelectCharacterData } from "state/selectors";
import { GetRegisteredStatusEffectConstructor, StatusData, StatusEffect } from "./statusEffect";
import { FlagWithData, Flags } from "./flags";
import Signal from "@rbxts/rbx-better-signal";
import { SkillData } from "./skill";

export interface CharacterData {
    statusEffects: Map<string, StatusData>;
    skills: Map<string, SkillData>;
    defaultProps: AffectableHumanoidProps;
}

export type AffectableHumanoidProps = Pick<Humanoid, "WalkSpeed" | "JumpPower" | "AutoRotate" | "JumpHeight">;

export class Character {
    private static readonly currentCharMap = new Map<Instance, Character>();
    public static readonly CharacterCreated = new Signal<(Character: Character) => void>();
    public static readonly CharacterDestroyed = new Signal<(Character: Character) => void>();

    public readonly Instance: Instance;
    public readonly Humanoid: Humanoid;

    public readonly StatusEffectAdded = new Signal<(Status: StatusEffect) => void>();
    public readonly StatusEffectRemoved = new Signal<(Status: StatusEffect) => void>();
    public readonly DamageTaken = new Signal<(Damage: number) => void>();
    public readonly Destroyed = new Signal();

    private readonly janitor = new Janitor();
    private readonly statusEffects: Map<string, StatusEffect> = new Map();
    private defaultsProps: AffectableHumanoidProps = {
        WalkSpeed: 16,
        JumpPower: 100,
        AutoRotate: true,
        JumpHeight: 7.2,
    };

    constructor(Instance: Instance);
    /**
     * @internal Reserved for internal usage
     */
    constructor(Instance: Instance, canCreateClient: (typeof Flags)["CanCreateCharacterClient"]);
    constructor(Instance: Instance, canCreateClient?: (typeof Flags)["CanCreateCharacterClient"]) {
        if (RunService.IsClient() && canCreateClient !== Flags.CanCreateCharacterClient) {
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

        Character.currentCharMap.set(Instance, this);
        Character.CharacterCreated.Fire(this);

        this.setupReplication_Client();

        this.janitor.Add(this.DamageTaken);
        this.janitor.Add(this.Destroyed);

        if (RunService.IsServer()) {
            rootProducer.setCharacterData(this.Instance, this._packData());
        } else {
            this.janitor.Add(this.StatusEffectAdded.Connect(() => this.updateHumanoidProps()));
            this.janitor.Add(this.StatusEffectRemoved.Connect(() => this.updateHumanoidProps()));
        }
    }

    public Destroy() {
        Character.currentCharMap.delete(this.Instance);

        if (RunService.IsServer()) {
            rootProducer.deleteCharacterData(this.Instance);
        }

        Character.CharacterDestroyed.Fire(this);
        this.Destroyed.Fire();
        this.janitor.Cleanup();
    }

    /**
     * @internal Reserved for internal usage
     */
    public _addStatus(Status: StatusEffect) {
        this.statusEffects.set(Status.GetId(), Status);
        this.StatusEffectAdded.Fire(Status);

        Status.Destroyed.Once(() => {
            this.statusEffects.delete(Status.GetId());
            this.StatusEffectRemoved.Fire(Status);
            this.updateHumanoidProps();
        });
    }

    /**
     * @internal Reserved for internal usage
     */
    public _packData(): CharacterData {
        const packedStatusEffect = new Map<string, StatusData>();
        this.statusEffects.forEach((Status, Id) => packedStatusEffect.set(Id, Status._packData()));

        return {
            statusEffects: packedStatusEffect,
            defaultProps: this.defaultsProps,
            skills: new Map(),
        };
    }

    public SetDefaultProps(Props: AffectableHumanoidProps) {
        this.defaultsProps = Props;
        if (RunService.IsServer()) {
            rootProducer.patchCharacterData(this.Instance, {
                defaultProps: Props,
            });
        }
    }

    public GetDefaultsProps() {
        return table.clone(this.defaultsProps);
    }

    public static GetCharacterMap() {
        return table.clone(this.currentCharMap) as ReadonlyMap<Instance, Character>;
    }

    public static GetCharacterFromInstance(Instance: Instance) {
        return this.currentCharMap.get(Instance);
    }

    public GetAllStatusEffects() {
        return mapToArray(this.statusEffects);
    }

    public GetAllActiveStatusEffects() {
        return mapToArray(this.statusEffects).filter((T) => T.GetState().IsActive);
    }

    public GetAllStatusEffectsOfType<T extends object>(Constructor: Constructor<T>) {
        return mapToArray(this.statusEffects).filter((T) => tostring(getmetatable(T)) === tostring(Constructor));
    }

    public GetAllActiveStatusEffectsOfType<T extends object>(Constructor: Constructor<T>) {
        return mapToArray(this.statusEffects).filter(
            (T) => tostring(getmetatable(T)) === tostring(Constructor) && T.GetState().IsActive,
        );
    }

    public HasStatusEffects(Constructors: Constructor<StatusEffect>[]) {
        for (const [_, Effect] of pairs(this.statusEffects)) {
            if (Constructors.find((T) => tostring(T) === tostring(getmetatable(Effect)))) return true;
        }
        return false;
    }

    private setupReplication_Client() {
        if (!RunService.IsClient()) return;
        if (!getActiveHandler()) return;

        const processStatusAddition = (Data: StatusData, Id: string) => {
            const constructor = GetRegisteredStatusEffectConstructor(Data.className);
            if (!constructor) {
                logError(
                    `Replication Error: Could not find a registered StatusEffect with name {statusData.className}. \n Try doing :RegisterDirectory() on the file directory.`,
                );
            }

            const newStatus = new constructor!(
                this as never,
                {
                    flag: Flags.CanAssignCustomId,
                    data: Id,
                } as never,
            );
            this.statusEffects.set(Id, newStatus);
            this.StatusEffectAdded.Fire(newStatus);

            const humanoidDataChanged = newStatus.HumanoidDataChanged.Connect(() => this.updateHumanoidProps());
            const stateChanged = newStatus.StateChanged.Connect(() => this.updateHumanoidProps());

            newStatus.Destroyed.Once(() => {
                humanoidDataChanged.Disconnect();
                stateChanged.Disconnect();
            });
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

            if (CharacterData.defaultProps !== this.defaultsProps) this.SetDefaultProps(CharacterData.defaultProps);
        };

        const dataSelector = SelectCharacterData(this.Instance);
        const disconnect = rootProducer.subscribe(dataSelector, proccessDataUpdate);
        proccessDataUpdate(dataSelector(rootProducer.getState()));

        this.janitor.Add(disconnect);
        this.updateHumanoidProps();
    }

    private updateHumanoidProps() {
        if (RunService.IsServer()) return;

        const statuses: StatusEffect[] = [];
        this.statusEffects.forEach((Status) => {
            if (Status.GetHumanoidData() && Status.GetState().IsActive) {
                statuses.push(Status);
            }
        });

        if (statuses.isEmpty()) return;
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

        for (const [PropertyName, Value] of pairs(propsToApply)) {
            this.Humanoid[PropertyName as never] = Value as never;
        }
    }
}
