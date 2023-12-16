import type { AffectableHumanoidProps, Character, DamageContainer } from "./character";
import { Janitor } from "@rbxts/janitor";
import { RunService } from "@rbxts/services";
import { Constructor, ReadonlyDeep, Replicatable, getActiveHandler, logError, logWarning } from "./utility";
import { FlagWithData, Flags } from "./flags";
import { Timer, TimerState } from "@rbxts/timer";
import { SelectStatusData } from "state/selectors";
import Signal from "@rbxts/rbx-better-signal";
import { deepCopy } from "@rbxts/deepcopy";
import { rootProducer } from "state/rootProducer";

export interface StatusData {
    className: string;
    state: StatusEffectState;
    metadata?: Replicatable | unknown;
    humanoidData?: HumanoidData;
}

export interface StatusEffectState {
    IsActive: boolean;
}

export interface HumanoidData {
    Mode: "Set" | "Increment";
    Props: Partial<AffectableHumanoidProps>;
    Priority: number;
}

type ReadonlyState = ReadonlyDeep<StatusEffectState>;

const registeredStatuses: Map<string, Constructor<StatusEffect>> = new Map();
let nextId = 0;
function generateId() {
    if (nextId > 9e9) {
        nextId = 0;
    }

    nextId += RunService.IsServer() ? 1 : -1;
    return tostring(nextId);
}

export class StatusEffect<T extends Replicatable | unknown = unknown> {
    private readonly janitor = new Janitor();

    public readonly MetadataChanged = new Signal<(NewMeta: T | undefined, PreviousMeta: T | undefined) => void>(
        this.janitor,
    );
    public readonly StateChanged = new Signal<(State: ReadonlyState, PreviousState: ReadonlyState) => void>(
        this.janitor,
    );
    public readonly HumanoidDataChanged = new Signal<
        (Data: HumanoidData | undefined, PreviousData: HumanoidData | undefined) => void
    >(this.janitor);
    public readonly Destroyed = new Signal(this.janitor);
    public readonly Started = new Signal(this.janitor);
    public readonly Ended = new Signal(this.janitor);

    public DestroyOnEnd = true;

    private state: StatusEffectState = {
        IsActive: false,
    };
    private metadata?: T;
    private humanoidData?: HumanoidData;

    private isDestroyed = false;
    private readonly timer = new Timer(1);
    private readonly id;
    private readonly isReplicated: boolean;

    constructor(Character: Character);
    /**
     * @internal Reserved for internal usage
     */
    constructor(Character: Character, overrideID: FlagWithData<string>);
    constructor(
        protected readonly Character: Character,
        overrideID?: FlagWithData<string>,
    ) {
        this.id = overrideID && overrideID.flag === Flags.CanAssignCustomId ? overrideID.data : generateId();

        if (!this.Character || tostring(getmetatable(this.Character)) !== "Character") {
            logError(`Not provided a valid character for StatusEffect constructor`);
        }

        if (!getActiveHandler()) {
            logError(`Attempted to instantiate a character before server has started.`);
        }

        this.isReplicated = RunService.IsClient() && tonumber(this.id)! > 0;
        Character._addStatus(this as StatusEffect);

        this.startReplicationClient();

        this.janitor.Add(
            this.StateChanged.Connect((State, PreviousState) => {
                if (!PreviousState.IsActive && State.IsActive) {
                    RunService.IsClient() ? this.OnStartClient() : this.OnStartServer();
                    this.Started.Fire();
                    RunService.IsServer() ?? this.OnEndServer();
                } else if (PreviousState.IsActive && !State.IsActive) {
                    RunService.IsClient() ? this.OnEndClient() : this.OnEndServer();
                    this.Ended.Fire();
                }
            }),
        );
        this.janitor.Add(this.Ended.Connect(() => this.DestroyOnEnd ?? this.Destroy()));

        this.janitor.Add(
            this.timer.completed.Connect(() => {
                this.End();
            }),
            "Disconnect",
        );

        if (RunService.IsServer()) {
            rootProducer.setStatusData(this.Character.GetId(), this.id, this._packData());
        }
        this.Construct();
    }

    /**
     * Starts the status effect.
     */
    public Start(Time?: number) {
        if (this.isReplicated) return logWarning(`Can't perform this action on a replicated status`);

        if (this.timer.getState() === TimerState.Running) {
            logWarning(`Can't start an already active StatusEffect`);
            return;
        }

        if (this.timer.getState() === TimerState.Paused) {
            this.timer.resume();
            this.timer.stop();
        }

        this.SetState({
            IsActive: true,
        });

        if (Time === undefined || Time <= 0) return;
        this.timer.setLength(Time);
        this.timer.start();
    }

    /**
     * Stops the status effect.
     */
    public End() {
        this.Stop();
    }

    /**
     * Paused the status effect.
     */
    public Pause() {
        if (this.isReplicated) return logWarning(`Can't perform this action on a replicated status`);

        if (this.timer.getState() !== TimerState.Running) {
            logWarning(`Can't pause a non active status effect`);
            return;
        }

        this.timer.pause();
    }

    /**
     * Resumes the status effect.
     */
    public Resume() {
        if (this.isReplicated) return logWarning(`Can't perform this action on a replicated status`);

        if (this.timer.getState() !== TimerState.Paused) {
            logWarning(`Can't resume a non paused status effect`);
            return;
        }

        this.timer.resume();
    }

    /**
     * Stops the status effect.
     */
    public Stop() {
        if (this.isReplicated) return logWarning(`Can't perform this action on a replicated status`);

        if (!this.GetState().IsActive) {
            logWarning(`Can't stop a non active status effect`);
            return;
        }

        this.SetState({
            IsActive: false,
        });

        if (this.timer.getState() === TimerState.NotRunning) {
            return;
        }

        if (this.timer.getState() === TimerState.Paused) {
            this.timer.resume();
            this.timer.stop();
            return;
        }

        this.timer.stop();
    }

    /**
     * Sets the humanoid data that is going to be applied to the character while the status effect is active.
     */
    public SetHumanoidData(Mode: "Set" | "Increment", Props: Partial<AffectableHumanoidProps>, Priority = 1) {
        const newData = {
            Mode: Mode,
            Props: Props,
            Priority: Priority,
        };

        this.HumanoidDataChanged.Fire(newData, this.humanoidData);
        this.humanoidData = newData;

        if (RunService.IsServer()) {
            rootProducer.patchStatusData(this.Character.GetId(), this.id, {
                humanoidData: this.humanoidData,
            });
        }
    }

    /**
     * Clear the humanoid data.
     */
    public ClearHumanoidData() {
        this.HumanoidDataChanged.Fire(undefined, this.humanoidData);
        this.humanoidData = undefined;

        if (RunService.IsServer()) {
            rootProducer.patchStatusData(this.Character.GetId(), this.id, {
                humanoidData: undefined,
            });
        }
    }

    /**
     * Clears the metadata
     */
    public ClearMetadata() {
        if (this.isReplicated) {
            logError(
                `Cannot :ClearMetadata() of replicated status effect on client! \n This can lead to a possible desync`,
            );
        }

        this.MetadataChanged.Fire(undefined, this.metadata);
        this.metadata = undefined;

        if (RunService.IsServer()) {
            rootProducer.patchStatusData(this.Character.GetId(), this.id, {
                metadata: undefined,
            });
        }
    }

    /**
     * Sets the state of the status effect.
     */
    protected SetState(Patch: Partial<StatusEffectState>) {
        if (this.isReplicated) {
            logError(`Cannot :SetState() of replicated status effect on client! \n This can lead to a possible desync`);
        }

        const newState = {
            ...this.state,
            ...Patch,
        };

        this.StateChanged.Fire(newState, this.state);
        this.state = newState;

        if (RunService.IsServer()) {
            rootProducer.patchStatusData(this.Character.GetId(), this.id, {
                state: newState,
            });
        }
    }

    /**
     * Sets the metadata of the status effect.
     */
    protected SetMetadata(NewMeta: T) {
        if (this.isReplicated) {
            logError(
                `Cannot :SetMetadata() of replicated status effect on client! \n This can lead to a possible desync`,
            );
        }

        this.MetadataChanged.Fire(NewMeta, this.metadata);
        this.metadata = NewMeta;

        if (RunService.IsServer()) {
            rootProducer.patchStatusData(this.Character.GetId(), this.id, {
                metadata: NewMeta,
            });
        }
    }

    /**
     * Gets the state of the status effect
     * */
    public GetState() {
        return table.clone(this.state) as ReadonlyState;
    }

    /**
     * Gets the humanoid data of the status effect
     */
    public GetHumanoidData() {
        return this.humanoidData !== undefined ? deepCopy(this.humanoidData) : undefined;
    }

    /**
     * Gets the metadata of the status effect
     */
    public GetMetadata() {
        let cloned: T | undefined = this.metadata;
        if (typeIs(this.metadata, "table")) {
            cloned = table.clone(this.metadata);
        }

        return cloned;
    }

    /**
     * Returns true if the status effect is destroyed
     */
    public IsDestroyed() {
        return this.isDestroyed;
    }

    /**
     * Gets the id of the status effect
     */
    public GetId() {
        return this.id;
    }

    /**
     * A method that is used to modify damage applied to a character
     */
    public HandleDamage(Modified: number, Original: number) {
        return Modified;
    }

    /**
     * Destroys the status effect and removes it from the character
     */
    public Destroy() {
        this.janitor.Cleanup();
        rootProducer.deleteStatusData(this.Character.GetId(), this.id);
        this.Destroyed.Fire();
    }

    /**
     * A shortcut for creating a damage container
     */
    public CreateDamageContainer(Damage: number): DamageContainer {
        return {
            Damage: Damage,
            Source: this as StatusEffect,
        };
    }

    /**
     * @internal Reserved for internal usage
     */
    public _packData(): StatusData {
        return {
            className: tostring(getmetatable(this)),
            state: this.state,
        };
    }

    private startReplicationClient() {
        if (!this.isReplicated) return;

        const proccessDataUpdate = (StatusData?: StatusData) => {
            if (!StatusData) return;

            if (StatusData.state !== this.state) {
                this.state = StatusData.state;
                this.StateChanged.Fire(StatusData.state, this.state);
            }

            if (StatusData.metadata !== this.metadata) {
                this.metadata = StatusData.metadata as T | undefined;
                this.MetadataChanged.Fire(StatusData.metadata as T | undefined, this.metadata);
            }

            if (StatusData.humanoidData !== this.humanoidData) {
                this.humanoidData = StatusData.humanoidData;
                this.HumanoidDataChanged.Fire(StatusData.humanoidData, this.humanoidData);
            }
        };

        const dataSelector = SelectStatusData(this.Character.GetId(), this.id);

        const subscription = rootProducer.subscribe(dataSelector, proccessDataUpdate);
        proccessDataUpdate(dataSelector(rootProducer.getState()));

        this.janitor.Add(subscription);
    }

    /**
     * @deprecated Should not be used in Typescript: Specificly for LuaU Usage (functionality replaced by class constructor)
     */
    public Construct() {}
    public OnStartServer() {}
    public OnStartClient() {}
    public OnEndClient() {}
    public OnEndServer() {}
}

export function StatusEffectDecorator<T extends Constructor<StatusEffect>>(Constructor: T) {
    const name = tostring(Constructor);
    if (registeredStatuses.has(name)) {
        logError(`StatusEffect with name ${name} was already registered before`);
    }

    registeredStatuses.set(name, Constructor);
}

export function GetRegisteredStatusEffectConstructor(Name: string) {
    return registeredStatuses.get(Name);
}
