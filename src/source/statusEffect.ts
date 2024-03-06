/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AffectableHumanoidProps, Character, DamageContainer } from "./character";
import { Janitor } from "@rbxts/janitor";
import { RunService } from "@rbxts/services";
import {
    Constructor,
    ReadonlyDeep,
    freezeCheck,
    getActiveHandler,
    isServerContext,
    logError,
    logWarning,
    isClientContext,
} from "./utility";
import { FlagWithData, Flags } from "./flags";
import { Timer, TimerState } from "@rbxts/timer";
import { SelectStatusData } from "state/selectors";
import { rootProducer } from "state/rootProducer";
import { t } from "@rbxts/t";
import Signal from "@rbxts/signal";

export interface StatusData {
    className: string;
    state: internal_statusEffectState;
    metadata?: unknown;
    humanoidData?: HumanoidData;
    constructorArgs: unknown[];
}

interface StatusEffectProps {
    Character: Character;
    Flag: FlagWithData<string>;
}

interface internal_statusEffectState extends StatusEffectState {
    _isActive_counter: number;
}

export interface StatusEffectState {
    IsActive: boolean;
}

export interface HumanoidData {
    Props: Partial<{
        [P in keyof AffectableHumanoidProps]: [AffectableHumanoidProps[P], "Set" | "Increment"];
    }>;
    Priority: number;
}

type StatusEffectConstructor = new (...args: [Character, ...constructorArgs: any[]]) => UnknownStatus;

type ReadonlyState = ReadonlyDeep<StatusEffectState>;
export type AnyStatus = StatusEffect<any, any[]>;
export type UnknownStatus = StatusEffect<unknown, unknown[]>;

const registeredStatuses: Map<string, StatusEffectConstructor> = new Map();
let nextId = 0;
function generateId() {
    nextId += isServerContext() ? 1 : -1;
    return tostring(nextId);
}

/**
 * A status effect class.
 */
export class StatusEffect<Metadata = void, ConstructorArguments extends unknown[] = []> {
    private readonly janitor = new Janitor();

    public readonly MetadataChanged = new Signal<
        (NewMeta: Metadata | undefined, PreviousMeta: Metadata | undefined) => void
    >();
    public readonly StateChanged = new Signal<(State: ReadonlyState, PreviousState: ReadonlyState) => void>();
    public readonly HumanoidDataChanged = new Signal<
        (Data: HumanoidData | undefined, PreviousData: HumanoidData | undefined) => void
    >();
    public readonly Destroyed = new Signal();
    public readonly Started = new Signal();
    public readonly Ended = new Signal();

    protected readonly Character: Character;
    public DestroyOnEnd = true;

    private state: internal_statusEffectState = {
        IsActive: false,
        _isActive_counter: 0,
    };
    private metadata?: Metadata;
    private humanoidData?: HumanoidData;

    private isDestroyed = false;
    private readonly timer = new Timer(1);
    private readonly id;
    private readonly isReplicated: boolean;

    protected readonly ConstructorArguments: ConstructorArguments;

    constructor(Character: Character, ...Args: ConstructorArguments);
    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    constructor(Character: StatusEffectProps);
    constructor(Props: Character | StatusEffectProps, ...Args: ConstructorArguments) {
        const { Character, Flag } =
            tostring(getmetatable(Props)) !== "Character"
                ? (Props as StatusEffectProps)
                : { Character: Props as Character, Flag: undefined };

        this.id = Flag && Flag.flag === Flags.CanAssignCustomId ? Flag.data : generateId();
        this.Character = Character;

        if (!this.Character || tostring(getmetatable(this.Character)) !== "Character") {
            logError(`Not provided a valid character for StatusEffect constructor`);
        }

        if (!getActiveHandler()) {
            logError(`Attempted to instantiate a character before server has started.`);
        }

        this.isReplicated = isClientContext() && tonumber(this.id)! > 0;
        this.ConstructorArguments = Args;

        this.janitor.Add(
            this.StateChanged.Connect((New, Old) =>
                this.stateDependentCallbacks(New as internal_statusEffectState, Old as internal_statusEffectState),
            ),
        );
        this.janitor.Add(this.Ended.Connect(() => this.DestroyOnEnd && this.Destroy()));

        this.janitor.Add(
            this.timer.completed.Connect(() => {
                this.End();
            }),
            "Disconnect",
        );

        this.janitor.Add(() => {
            this.StateChanged.Destroy();
            this.MetadataChanged.Destroy();
            this.HumanoidDataChanged.Destroy();
            this.Destroyed.Destroy();
            this.Started.Destroy();
            this.Ended.Destroy();
        });

        Character._addStatus(this);
        this.startReplicationClient();

        if (isServerContext()) {
            rootProducer.setStatusData(this.Character.GetId(), this.id, this._packData());
        }
        this.OnConstruct(...Args);
        isServerContext() ? this.OnConstructServer(...Args) : this.OnConstructClient(...Args);
    }

    /**
     * Starts the status effect.
     */
    public Start(Time?: number) {
        if (this.isReplicated) return logWarning(`Cannot perform this action on a replicated status`);

        if (this.timer.getState() === TimerState.Running) {
            return;
        }

        if (this.timer.getState() === TimerState.Paused) {
            this.timer.resume();
            this.timer.stop();
        }

        this._setState({
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
        if (this.isReplicated) return logWarning(`Cannot perform this action on a replicated status`);

        if (this.timer.getState() !== TimerState.Running) {
            logWarning(`Cannot pause a non active status effect`);
            return;
        }

        this.timer.pause();
    }

    /**
     * Resumes the status effect.
     */
    public Resume() {
        if (this.isReplicated) return logWarning(`Cannot perform this action on a replicated status`);

        if (this.timer.getState() !== TimerState.Paused) {
            logWarning(`Cannot resume a non paused status effect`);
            return;
        }

        this.timer.resume();
    }

    /**
     * Stops the status effect.
     */
    public Stop() {
        if (this.isReplicated) return logWarning(`Cannot perform this action on a replicated status`);

        if (!this.GetState().IsActive) {
            logWarning(`Cannot stop a non active status effect`);
            return;
        }

        this._setState({
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
    public SetHumanoidData(Props: HumanoidData["Props"], Priority = 1) {
        const newData = {
            Props: Props,
            Priority: Priority,
        };

        this.HumanoidDataChanged.Fire(newData, this.humanoidData);
        this.humanoidData = newData;

        if (isServerContext()) {
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

        if (isServerContext()) {
            rootProducer.patchStatusData(this.Character.GetId(), this.id, {
                humanoidData: undefined,
            });
        }
    }

    /**
     * Clears the metadata
     */
    protected ClearMetadata() {
        if (this.isReplicated) {
            logError(
                `Cannot :ClearMetadata() of replicated status effect on client! \n This can lead to a possible desync`,
            );
        }

        this.MetadataChanged.Fire(undefined, this.metadata);
        this.metadata = undefined;

        if (isServerContext()) {
            rootProducer.patchStatusData(this.Character.GetId(), this.id, {
                metadata: undefined,
            });
        }
    }

    /**
     * Sets the state of the status effect.
     */
    protected _setState(Patch: Partial<StatusEffectState>) {
        const newState = {
            ...this.state,
            ...Patch,
        };
        if (Patch.IsActive !== undefined) newState._isActive_counter++;

        const oldState = this.state;

        freezeCheck(newState);
        this.state = newState;

        if (isServerContext()) {
            rootProducer.patchStatusData(this.Character.GetId(), this.id, {
                state: newState,
            });
        }

        this.StateChanged.Fire(newState, oldState);
    }

    /**
     * Sets the metadata of the status effect.
     */
    protected SetMetadata(NewMeta: Metadata) {
        if (this.isReplicated) {
            logError(
                `Cannot :SetMetadata() of replicated status effect on client! \n This can lead to a possible desync`,
            );
        }
        if (t.table(NewMeta)) freezeCheck(NewMeta);

        this.MetadataChanged.Fire(NewMeta, this.metadata);
        this.metadata = NewMeta;

        if (isServerContext()) {
            rootProducer.patchStatusData(this.Character.GetId(), this.id, {
                metadata: NewMeta,
            });
        }
    }

    /**
     * Gets the state of the status effect
     * */
    public GetState() {
        return this.state as ReadonlyState;
    }

    /**
     * Gets the humanoid data of the status effect
     */
    public GetHumanoidData() {
        return this.humanoidData;
    }

    /**
     * Gets the metadata of the status effect
     */
    public GetMetadata() {
        return this.metadata;
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
        if (isServerContext()) {
            rootProducer.deleteStatusData(this.Character.GetId(), this.id);
        }

        this.isDestroyed = true;
        this.Destroyed.Fire();
        this.janitor.Cleanup();
    }

    /**
     * A shortcut for creating a damage container
     */
    protected CreateDamageContainer(Damage: number): DamageContainer {
        return {
            Damage: Damage,
            Source: this,
        };
    }

    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    public _packData(): StatusData {
        return {
            className: tostring(getmetatable(this)),
            state: this.state,
            constructorArgs: this.ConstructorArguments,
        };
    }

    private stateDependentCallbacks(State: internal_statusEffectState, PreviousState: internal_statusEffectState) {
        if (PreviousState.IsActive === State.IsActive) return;
        if (!PreviousState.IsActive && State.IsActive) {
            isClientContext() ? this.OnStartClient() : this.OnStartServer();
            this.Started.Fire();
            isServerContext() ?? this.OnEndServer();
        } else if (PreviousState.IsActive && !State.IsActive) {
            isClientContext() ? this.OnEndClient() : this.OnEndServer();
            this.Ended.Fire();
        }

        if (PreviousState.IsActive === this.state.IsActive && this.isReplicated) {
            this.OnStartClient();
            this.Started.Fire();
            this.OnEndClient();
            this.Ended.Fire();
        }
    }

    /** @hidden @internal */
    public _processDataUpdate(StatusData?: StatusData, PreviousData?: StatusData) {
        if (!StatusData) {
            if (PreviousData) this._processDataUpdate(PreviousData);
            return;
        }

        const previousData = PreviousData || this._packData();

        if (StatusData.state !== previousData.state) {
            freezeCheck(StatusData.state);
            this.state = StatusData.state;
            this.StateChanged.Fire(StatusData.state, previousData.state);
        }

        if (StatusData.metadata !== previousData.metadata) {
            if (t.table(StatusData.metadata)) freezeCheck(StatusData.metadata);
            this.metadata = StatusData.metadata as Metadata | undefined;
            this.MetadataChanged.Fire(
                StatusData.metadata as Metadata | undefined,
                previousData.metadata as Metadata | undefined,
            );
        }

        if (StatusData.humanoidData !== previousData.humanoidData) {
            if (StatusData.humanoidData) freezeCheck(StatusData.humanoidData);
            this.humanoidData = StatusData.humanoidData;
            this.HumanoidDataChanged.Fire(StatusData.humanoidData, previousData.humanoidData);
        }
    }

    private startReplicationClient() {
        if (!this.isReplicated) return;

        const dataSelector = SelectStatusData(this.Character.GetId(), this.id);

        const subscription = rootProducer.subscribe(dataSelector, (...args: [StatusData?, StatusData?]) =>
            this._processDataUpdate(...args),
        );
        this._processDataUpdate(dataSelector(rootProducer.getState()));

        this.janitor.Add(subscription);
    }

    /** Called after class gets instantiated (both client and server) */
    protected OnConstruct(...Args: ConstructorArguments) {}
    /** Called after class gets instantiated on client */
    protected OnConstructClient(...Args: ConstructorArguments) {}
    /** Called after class gets instantiated on server */
    protected OnConstructServer(...Args: ConstructorArguments) {}

    protected OnStartServer() {}
    protected OnStartClient() {}
    protected OnEndClient() {}
    protected OnEndServer() {}
}

export function StatusEffectDecorator<T extends StatusEffectConstructor>(Constructor: T) {
    const name = tostring(Constructor);
    if (registeredStatuses.has(name)) {
        logError(`StatusEffect with name ${name} was already registered before`);
    }

    registeredStatuses.set(name, Constructor);
}

export function GetRegisteredStatusEffectConstructor(Name: string) {
    return registeredStatuses.get(Name);
}
