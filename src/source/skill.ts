/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable roblox-ts/no-array-pairs */
import { Players, RunService, Workspace } from "@rbxts/services";
import { Character, DamageContainer } from "./character";
import { Flags } from "./flags";
import {
    Constructor,
    ReadonlyDeep,
    createIdGenerator,
    freezeCheck,
    getActiveHandler,
    isClientContext,
    isServerContext,
    logError,
    logWarning,
} from "./utility";
import { Janitor } from "@rbxts/janitor";
import { SelectSkillData } from "state/selectors";
import { ClientEvents } from "./networking";
import { rootProducer } from "state/rootProducer";
import { AnyStatus } from "./statusEffect";
import Signal from "@rbxts/signal";
import { Timer, TimerState } from "@rbxts/timer";
import { t } from "@rbxts/t";
import { skillRequestSerializer } from "./serdes";

export interface SkillState {
    IsActive: boolean;
    Debounce: boolean;
    MaxHoldTime?: number;
    StarterParams: unknown[];
}

export enum SkillType {
    Default = "Default",
    Holdable = "Holdable",
}

/** @hidden @internal */
export interface SkillProps {
    Character: Character;
    Flag: (typeof Flags)["CanInstantiateSkillClient"];
}

/** @hidden */
export interface _internal_SkillState extends SkillState {
    _timerEndTimestamp?: number;
    _isActive_counter: number;
}

type ReadonlyState = ReadonlyDeep<SkillState>;

export interface SkillData {
    state: _internal_SkillState;
    constructorArguments: unknown[];
    metadata: unknown;
}
export type AnySkill = SkillBase<any, any[], any>;
export type UnknownSkill = SkillBase<unknown[], unknown[], unknown>;

const nextId = createIdGenerator();
const registeredSkills = new Map<string, Constructor<UnknownSkill>>();

/** @hidden */
export abstract class SkillBase<
    StarterParams extends unknown[] = [],
    ConstructorArguments extends unknown[] = [],
    Metadata = void,
> {
    /** @internal @hidden */
    protected readonly _janitor = new Janitor();

    /**@internal @hidden */
    public readonly _id = nextId();
    /**
     * A Janitor object. Cleans up everything after skill ends.
     */
    protected readonly Janitor = new Janitor();
    /**
     * A Timer object. Starts, when ApplyCooldown() gets invoked on server. Does not sync to client.
     */
    protected readonly CooldownTimer = new Timer(1);
    /**
     * A Character object this skill is tied with.
     */
    public readonly Character: Character;

    /** Fires whenever skill starts. Works on client and server. */
    public readonly Started = new Signal();
    /** Fires whenever skill ends. Works on client and server. */
    public readonly Ended = new Signal();
    /** Fires whenever current skill state changes. */
    public readonly StateChanged = new Signal<(NewState: SkillState, OldState: SkillState) => void>();
    /** Fires whenever skill gets destroyed (removed from the character). */
    public readonly Destroyed = new Signal();
    /** Fires whenever skill metadata changes. */
    public readonly MetadataChanged = new Signal<
        (NewMeta: Metadata | undefined, PreviousMeta: Metadata | undefined) => void
    >();

    private executionThread?: thread;

    /**
     * Checks whenever other skills should be non active for :Start() to proceed.
     */
    protected CheckOthersActive = true;
    /**
     * Determines if other skills should check if the skill is active to proceed.
     */
    protected CheckedByOthers = true;
    /**
     * An array of Status Effect constructors.
     * If any of them is applied to Character object whenever Start() is called, it will not proceed further and skill will not be started.
     */
    protected MutualExclusives: Constructor<AnyStatus>[] = [];
    /**
     * An array of Status Effect constructors.
     * Checks Character for the following effects to be applied before starting the skill.
     */
    protected Requirements: Constructor<AnyStatus>[] = [];

    /** Checks whenever the start function should check if the skill is active/on cooldown on client side before firing a remote. */
    protected CheckClientState = true;

    /**
     * A Player object the skill is associated with. Retrieved internally by Players:GetPlayerFromCharacter(self.Character.Instance).
     */
    public readonly Player?: Player;

    /** @internal @hidden */
    protected readonly isReplicated: boolean;
    private state: _internal_SkillState = {
        _isActive_counter: 0,
        IsActive: false,
        Debounce: false,
        StarterParams: [],
    };
    private destroyed = false;
    private metadata?: Metadata;
    protected readonly Name = tostring(getmetatable(this));
    /**
     * A table of arguments provided after the Character in .new().
     */
    protected readonly ConstructorArguments: ConstructorArguments;
    /** @internal @hidden */
    protected _skillType = SkillType.Default;

    constructor(Character: Character, ...Args: ConstructorArguments);
    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    constructor(Props: SkillProps);
    constructor(Props: SkillProps | Character, ...Args: ConstructorArguments) {
        const { Character, Flag } =
            tostring(getmetatable(Props)) !== "Character"
                ? (Props as SkillProps)
                : { Character: Props as Character, Flag: undefined };

        this.Character = Character;
        if (!this.Character || tostring(getmetatable(this.Character)) !== "Character") {
            logError(`Not provided a valid character for Skill constructor`);
        }

        if (!getActiveHandler()) {
            logError(`Attempted to instantiate a skill before server has started.`);
        }

        if (isClientContext() && Flag !== Flags.CanInstantiateSkillClient) {
            logError(`Attempted to instantiate a skill on client`);
        }

        this.Player = Players.GetPlayerFromCharacter(this.Character.Instance);
        this.ConstructorArguments = Args;

        if (isServerContext()) {
            /*this._janitor.Add(
                remotes._messageToServer.connect((Player, CharacterId, SkillName, Message) => {
                    if (Player !== this.Player) return;
                    if (SkillName !== this.Name) return;
                    if (CharacterId !== this.Character.GetId()) return;


                }),
            );*/
        } else {
            /*this._janitor.Add(
                remotes._messageToClient.connect((CharacterId, SkillName, Message) => {
                    if (SkillName !== this.Name) return;
                    if (CharacterId !== this.Character.GetId()) return;


                }),
            );*/
        }

        this.CooldownTimer.completed.Connect(() => {
            if (!this.GetState().Debounce) return;
            this._setState({
                Debounce: false,
            });
        });

        this.Ended.Connect(() => this.Janitor.Cleanup());

        this._janitor.Add(() => {
            this.StateChanged.Destroy();
            this.Destroyed.Destroy();
            this.Started.Destroy();
            this.Ended.Destroy();
            this.CooldownTimer.destroy();
            this.MetadataChanged.Destroy();
        });

        this.StateChanged.Connect((New, Old) =>
            this._stateDependentCallbacks(New as _internal_SkillState, Old as _internal_SkillState),
        );

        this.isReplicated = isClientContext();
    }

    /** @hidden @internal */
    protected _init() {
        this.Character._addSkill(this);
        this.startReplication();
        if (!this.isReplicated) {
            rootProducer.setSkillData(this.Character.GetId(), this.Name, this.packData());
        }

        const Args = this.ConstructorArguments;

        this.OnConstruct(...Args);
        isServerContext() ? this.OnConstructServer(...Args) : this.OnConstructClient(...Args);
    }

    /**
     * Server: Starts the skill
     * Client: Sends a request to server that will call :Start() on server
     */
    public Start(...params: StarterParams) {
        if (this.Character.DisableSkills) return;

        const state = this.GetState();
        if ((state.IsActive || state.Debounce) && !(isClientContext() && !this.CheckClientState)) return;

        if (isClientContext()) {
            const serialized = skillRequestSerializer.serialize([this.Character.GetId(), this.Name, "Start", params]);
            ClientEvents.requestSkill.fire(serialized);
            return;
        }

        for (const [_, Exclusive] of pairs(this.MutualExclusives)) {
            if (!this.Character.GetAllActiveStatusEffectsOfType(Exclusive).isEmpty()) return;
        }

        for (const [_, Requirement] of pairs(this.Requirements)) {
            if (this.Character.GetAllActiveStatusEffectsOfType(Requirement).isEmpty()) return;
        }

        if (
            this.CheckOthersActive &&
            this.Character.GetAllActiveSkills()
                .filter((T) => T.CheckedByOthers)
                .size() > 0
        )
            return;
        if (!this.ShouldStart(...params)) return;

        this._setState({
            IsActive: true,
            StarterParams: params,
            Debounce: false,
        });
    }

    /** Returns true if the skill is destroyed / removed from the Character. */
    public IsDestroyed() {
        return this.destroyed;
    }

    /**
     * Force end the skill. This is automatically called after OnStartServer() is completed
     */
    public End() {
        if (isClientContext()) {
            const serialized = skillRequestSerializer.serialize([this.Character.GetId(), this.Name, "End", []]);
            ClientEvents.requestSkill.fire(serialized);

            return;
        }

        this._setState({
            IsActive: false,
            StarterParams: [],
        });
    }

    /** Alias for End() */
    public Stop() {
        this.End();
    }

    /** Retrieves the skill type */
    public GetSkillType() {
        return this._skillType;
    }

    /**
     * Destroys the skill and removes it from the character
     */
    public Destroy() {
        this._setState({
            IsActive: false,
            Debounce: false,
            StarterParams: [],
        });

        if (isServerContext()) {
            rootProducer.deleteSkillData(this.Character.GetId(), this.Name);
        }
        this.destroyed = true;
        this.Destroyed.Fire();
        this._janitor.Cleanup();
    }

    /** @internal @hidden */
    protected _stateDependentCallbacks(State: _internal_SkillState, PreviousState: _internal_SkillState) {
        if (PreviousState._isActive_counter === State._isActive_counter) return;

        if (!PreviousState.IsActive && State.IsActive) {
            this.Started.Fire();
            this.executionThread = task.spawn(() => {
                isClientContext()
                    ? this.OnStartClient(...(State.StarterParams as StarterParams))
                    : this.OnStartServer(...(State.StarterParams as StarterParams));
                this.executionThread = undefined;
                if (isServerContext()) this.End();
            });
        } else if (PreviousState.IsActive && !State.IsActive) {
            if (this.executionThread) task.cancel(this.executionThread);
            isClientContext() ? this.OnEndClient() : this.OnEndServer();
            this.Ended.Fire();
        }
        if (PreviousState.IsActive === State.IsActive && this.isReplicated) {
            this.Started.Fire();
            const thread = task.spawn(() => this.OnStartClient(...(State.StarterParams as StarterParams)));
            task.cancel(thread);

            this.OnEndClient();
            this.Ended.Fire();
        }
    }

    public GetDebounceEndTimestamp() {
        if (!this.state.Debounce) return;
        return this.state._timerEndTimestamp;
    }

    /** Retrieves the current skill state. */
    public GetState() {
        return this.state as ReadonlyState;
    }

    /** Retrieves the skill name. */
    public GetName() {
        return this.Name;
    }

    /** @internal @hidden */
    public GetId() {
        return this.Name;
    }

    /**
     * Clears the current Metadata. Only works on server.
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
            rootProducer.patchSkillData(this.Character.GetId(), this.Name, {
                metadata: undefined,
            });
            rootProducer.flush();
        }
    }

    /**
     * Sets the current Metadata.
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
            rootProducer.patchSkillData(this.Character.GetId(), this.Name, {
                metadata: NewMeta,
            });
            rootProducer.flush();
        }
    }

    /**
     * Retrieves the current Metadata.
     * */
    public GetMetadata() {
        return this.metadata;
    }

    /**
     * Creates a damage container, with the current skill specified in Source.
     */
    protected CreateDamageContainer(Damage: number): DamageContainer {
        return {
            Damage: Damage,
            Source: this,
        };
    }

    /**
     * Applies a cooldown to the skill. Works only on server.
     */
    protected ApplyCooldown(Duration: number) {
        if (!isServerContext()) {
            logWarning(`Cannot :ApplyCooldown() on client.`);
            return;
        }

        if (this.CooldownTimer.getState() === TimerState.Running) {
            this.CooldownTimer.stop();
        }

        if (this.CooldownTimer.getState() === TimerState.Paused) {
            this.CooldownTimer.resume();
            this.CooldownTimer.stop();
        }

        this.CooldownTimer.setLength(Duration);
        this.CooldownTimer.start();

        this._setState({
            Debounce: true,
            _timerEndTimestamp: Workspace.GetServerTimeNow() + this.CooldownTimer.getTimeLeft(),
        });
    }

    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    protected _setState(Patch: Partial<_internal_SkillState>) {
        const newState = {
            ...this.state,
            ...Patch,
        };
        if (Patch.IsActive !== undefined && this.state.IsActive !== Patch.IsActive) newState._isActive_counter++;

        const oldState = this.state;

        freezeCheck(newState);
        this.state = newState;

        if (isServerContext()) {
            rootProducer.patchSkillData(this.Character.GetId(), this.Name, {
                state: newState,
            });
            rootProducer.flush();
        }

        this.StateChanged.Fire(newState, oldState);
    }

    /**
     * Determines if the skill should start, when Start() is called.
     */
    protected ShouldStart(...params: StarterParams): boolean {
        return true;
    }

    /** @hidden @internal */
    public _processDataUpdate(NewData?: SkillData, OldData: SkillData = this.packData()) {
        if (!NewData) return;

        if (NewData.state !== OldData.state) {
            freezeCheck(NewData.state);
            this.state = NewData.state;
            this.StateChanged.Fire(NewData.state, OldData.state);
        }

        if (NewData.metadata !== OldData.metadata) {
            if (t.table(NewData.metadata)) freezeCheck(NewData.metadata);
            this.metadata = NewData.metadata as Metadata | undefined;
            this.MetadataChanged.Fire(
                NewData.metadata as Metadata | undefined,
                OldData.metadata as Metadata | undefined,
            );
        }
    }

    private startReplication() {
        if (!this.isReplicated) return;

        const dataSelector = SelectSkillData(this.Character.GetId(), this.Name);
        this._processDataUpdate(dataSelector(rootProducer.getState()));
        rootProducer.subscribe(dataSelector, (...args: [SkillData?, SkillData?]) => this._processDataUpdate(...args));
    }

    private packData(): SkillData {
        return {
            state: this.state,
            constructorArguments: this.ConstructorArguments,
            metadata: this.metadata,
        };
    }

    /** Called after class gets instantiated (both client and server) */
    protected OnConstruct(...Args: ConstructorArguments) {}
    /** Called after class gets instantiated on client */
    protected OnConstructClient(...Args: ConstructorArguments) {}
    /** Called after class gets instantiated on server */
    protected OnConstructServer(...Args: ConstructorArguments) {}
    /** Called whenever skill starts on the server. Accepts an argument passed to Start(). */
    protected OnStartServer(...Params: StarterParams) {}
    /** Called whenever skill starts on the client. Accepts an argument passed to Start(). */
    protected OnStartClient(...Params: StarterParams) {}
    /** Called whenever server when a message from client was received. */
    protected OnEndClient() {}
    /** Called whenever skill ends on client. */
    protected OnEndServer() {}
}

/** A skill class. */
export abstract class Skill<
    StarterParams extends unknown[] = [],
    ConstructorArguments extends unknown[] = [],
    Metadata = void,
> extends SkillBase<StarterParams, ConstructorArguments, Metadata> {
    constructor(Character: Character, ...Args: ConstructorArguments) {
        super(Character, ...Args);
        this._init();
    }
}

/**
 * A decorator function that registers a skill.
 */
export function SkillDecorator<T extends Constructor<AnySkill>>(Constructor: T) {
    const name = tostring(Constructor);
    if (registeredSkills.has(name)) {
        logError(`StatusEffect with name ${name} was already registered before`);
    }

    registeredSkills.set(name, Constructor);
}

/**
 * Retrieves the constructor function of a registered skill by name.
 */
export function GetRegisteredSkillConstructor(Name: string) {
    return registeredSkills.get(Name);
}

/**
 * @internal
 * @hidden
 */
export function GetRegisteredSkills() {
    return table.freeze(table.clone(registeredSkills)) as ReadonlyMap<string, Constructor<UnknownSkill>>;
}
