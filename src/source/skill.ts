/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable roblox-ts/no-array-pairs */
import { Players, RunService } from "@rbxts/services";
import { Character, DamageContainer } from "./character";
import { Flags } from "./flags";
import {
    Constructor,
    ReadonlyDeep,
    freezeCheck,
    getActiveHandler,
    isClientContext,
    isServerContext,
    logError,
    logWarning,
} from "./utility";
import { Janitor } from "@rbxts/janitor";
import { SelectSkillData } from "state/selectors";
import { remotes } from "./remotes";
import { rootProducer } from "state/rootProducer";
import { AnyStatus, StatusEffect } from "./statusEffect";
import Signal from "@rbxts/signal";
import { Timer, TimerState } from "@rbxts/timer";
import { t } from "@rbxts/t";

export interface SkillState {
    IsActive: boolean;
    Debounce: boolean;
    MaxHoldTime?: number;
    TimerEndTimestamp?: number;
    StarterParams?: unknown;
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

/** @internal @hidden */
export interface _internal_SkillState extends SkillState {
    _isActive_counter: number;
}

type ReadonlyState = ReadonlyDeep<SkillState>;

export interface SkillData {
    state: _internal_SkillState;
    constructorArguments: unknown[];
    metadata: unknown;
}
export type AnySkill = Skill<any, any[], any, any, any>;
export type UnknownSkill = Skill<unknown, unknown[], unknown, unknown, unknown>;

const registeredSkills = new Map<string, Constructor<UnknownSkill>>();

/** @hidden @internal */
export abstract class SkillBase<
    StarterParams = void,
    ConstructorArguments extends unknown[] = [],
    Metadata = void,
    ServerToClientMessage = void,
    ClientToServerMessage = void,
> {
    /** @internal @hidden */
    protected readonly _janitor = new Janitor();
    protected readonly Janitor = new Janitor();
    protected readonly CooldownTimer = new Timer(1);
    protected readonly Character: Character;

    public readonly Started = new Signal();
    public readonly Ended = new Signal();
    public readonly StateChanged = new Signal<(NewState: SkillState, OldState: SkillState) => void>();
    public readonly Destroyed = new Signal();
    public readonly MetadataChanged = new Signal<
        (NewMeta: Metadata | undefined, PreviousMeta: Metadata | undefined) => void
    >();

    /**
     * Checks whenever other skills should be non active for :Start() to procceed.
     */
    protected CheckOthersActive = true;
    protected MutualExclusives: Constructor<AnyStatus>[] = [];
    protected Requirements: Constructor<AnyStatus>[] = [];

    /** Whenever the start function should check if the skill is active/on cooldown on client side before firing a remote */
    protected CheckClientState = true;

    public Player?: Player;

    /** @internal @hidden */
    protected readonly isReplicated: boolean;
    private state: _internal_SkillState = {
        _isActive_counter: 0,
        IsActive: false,
        Debounce: false,
    };
    private destroyed = false;
    private metadata?: Metadata;
    protected readonly Name = tostring(getmetatable(this));
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
            this._janitor.Add(
                remotes._messageToServer.connect((Player, CharacterId, SkillName, Message) => {
                    if (Player !== this.Player) return;
                    if (SkillName !== this.Name) return;
                    if (CharacterId !== this.Character.GetId()) return;

                    this.HandleClientMessage(Message as ClientToServerMessage);
                }),
            );
        } else {
            this._janitor.Add(
                remotes._messageToClient.connect((CharacterId, SkillName, Message) => {
                    if (SkillName !== this.Name) return;
                    if (CharacterId !== this.Character.GetId()) return;

                    this.HandleServerMessage(Message as ServerToClientMessage);
                }),
            );
        }

        this._janitor.Add(
            this.CooldownTimer.completed.Connect(() => {
                if (!this.GetState().Debounce) return;
                this.SetState({
                    Debounce: false,
                });
            }),
            "Disconnect",
        );

        this._janitor.Add(() => {
            this.StateChanged.Destroy();
            this.Destroyed.Destroy();
            this.Started.Destroy();
            this.Ended.Destroy();
            this.CooldownTimer.destroy();
            this.MetadataChanged.Destroy();
        });

        this._janitor.Add(
            this.StateChanged.Connect((New, Old) =>
                this._stateDependentCallbacks(New as _internal_SkillState, Old as _internal_SkillState),
            ),
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
    public Start(StarterParams: StarterParams) {
        const state = this.GetState();
        if ((state.IsActive || state.Debounce) && !(isClientContext() && !this.CheckClientState)) return;

        if (isClientContext()) {
            remotes._requestSkill.fire(this.Character.GetId(), this.Name, "Start", StarterParams);
            return;
        }

        const activeEffects = this.Character.GetAllActiveStatusEffects();
        for (const [_, Exclusive] of pairs(this.MutualExclusives)) {
            if (activeEffects.find((T) => tostring(getmetatable(T)) === tostring(Exclusive))) return;
        }

        for (const [_, Requirement] of pairs(this.Requirements)) {
            if (!activeEffects.find((T) => tostring(getmetatable(T)) === tostring(Requirement))) return;
        }

        if (this.CheckOthersActive && this.Character.GetAllActiveSkills().size() > 0) return;
        if (!this.ShouldStart(StarterParams)) return;

        this.SetState({
            IsActive: true,
            StarterParams: StarterParams,
            Debounce: false,
        });
    }

    public IsDestroyed() {
        return this.destroyed;
    }

    /**
     * Force end the skill. This is automatically called after OnStartServer() is completed
     */
    public End() {
        if (isClientContext()) {
            remotes._requestSkill.fire(this.Character.GetId(), this.Name, "End", undefined);
            return;
        }

        this.SetState({
            IsActive: false,
            StarterParams: undefined,
        });
        this.Janitor.Cleanup();
    }

    /** Retrieves the skill type */
    public GetSkillType() {
        return this._skillType;
    }

    /**
     * Destroys the skill and removes it from the character
     */
    public Destroy() {
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
            isClientContext()
                ? this.OnStartClient(State.StarterParams as StarterParams)
                : this.OnStartServer(State.StarterParams as StarterParams);
            if (isServerContext()) this.End();
        } else if (PreviousState.IsActive && !State.IsActive) {
            isClientContext() ? this.OnEndClient() : this.OnEndServer();
            this.Ended.Fire();
        }
        if (PreviousState.IsActive === State.IsActive && this.isReplicated) {
            this.Started.Fire();
            this.OnStartClient(State.StarterParams as StarterParams);
            this.OnEndClient();
            this.Ended.Fire();
        }
    }

    public GetState() {
        return this.state as ReadonlyState;
    }

    public GetName() {
        return this.Name;
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
            rootProducer.patchSkillData(this.Character.GetId(), this.Name, {
                metadata: undefined,
            });
        }
    }

    /**
     * Sets the metadata of the skill.
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
        }
    }

    /**
     * Gets the metadata of the skill
     * */
    public GetMetadata() {
        return this.metadata;
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

    protected ApplyCooldown(Duration: number) {
        if (!isServerContext()) {
            logWarning(`Cannot :ApplyCooldown() on client.`);
            return;
        }

        this.SetState({
            Debounce: true,
        });

        if (this.CooldownTimer.getState() === TimerState.Running) {
            this.CooldownTimer.stop();
        }

        if (this.CooldownTimer.getState() === TimerState.Paused) {
            this.CooldownTimer.resume();
            this.CooldownTimer.stop();
        }

        this.CooldownTimer.setLength(Duration);
        this.CooldownTimer.start();
    }

    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    protected SetState(Patch: Partial<SkillState>) {
        if (this.isReplicated) {
            logError(`Cannot :SetState() of replicated status effect on client! \n This can lead to a possible desync`);
        }

        const newState = {
            ...this.state,
            ...Patch,
        };
        if (Patch.IsActive !== undefined) newState._isActive_counter++;

        const oldState = this.state;

        freezeCheck(newState);
        this.state = newState;

        if (isServerContext()) {
            rootProducer.patchSkillData(this.Character.GetId(), this.Name, {
                state: newState,
            });
        }

        this.StateChanged.Fire(newState, oldState);
    }

    /**
     * Determines whether the skill should start or not.
     */
    protected ShouldStart(Params: StarterParams): boolean {
        return true;
    }

    /** @hidden @internal */
    public _proccessDataUpdate(NewData?: SkillData, OldData: SkillData = this.packData()) {
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
        this._proccessDataUpdate(dataSelector(rootProducer.getState()));
        rootProducer.subscribe(dataSelector, (...args: [SkillData?, SkillData?]) => this._proccessDataUpdate(...args));
    }

    /**
     * Sends a message from the server to the client.
     */
    protected SendMessageToClient(Message: ServerToClientMessage) {
        if (!this.Player) return;

        if (!isServerContext()) {
            logWarning(`Tried to send a message from client to client`);
            return;
        }

        remotes._messageToClient.fire(this.Player, this.Character.GetId(), this.Name, Message);
    }

    /**
     * Sends a message to the server.
     */
    protected SendMessageToServer(Message: ClientToServerMessage) {
        if (!this.Player) return;

        if (!isClientContext()) {
            logWarning(`Tried to send a message from server to server`);
            return;
        }

        remotes._messageToServer.fire(this.Character.GetId(), this.Name, Message);
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
    protected OnStartServer(StarterParams: StarterParams) {}
    protected OnStartClient(StarterParams: StarterParams) {}
    protected HandleClientMessage(Message: ClientToServerMessage) {}
    protected HandleServerMessage(Message: ServerToClientMessage) {}
    protected OnEndClient() {}
    protected OnEndServer() {}
}

/** A skill class. */
export abstract class Skill<
    StarterParams = void,
    ConstructorArguments extends unknown[] = [],
    Metadata = void,
    ServerToClientMessage = void,
    ClientToServerMessage = void,
> extends SkillBase<StarterParams, ConstructorArguments, Metadata, ServerToClientMessage, ClientToServerMessage> {
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
