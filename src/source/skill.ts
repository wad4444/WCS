/* eslint-disable roblox-ts/no-array-pairs */
import { Players, RunService } from "@rbxts/services";
import { Character, DamageContainer } from "./character";
import { Flags } from "./flags";
import { Constructor, ReadonlyDeep, ReplicatableValue, getActiveHandler, logError, logWarning } from "./utility";
import { Janitor } from "@rbxts/janitor";
import { SelectSkillData } from "state/selectors";
import { remotes } from "./remotes";
import { rootProducer } from "state/rootProducer";
import { StatusEffect } from "./statusEffect";
import Signal from "@rbxts/signal";
import { Timer, TimerState } from "@rbxts/timer";

export interface SkillState {
    IsActive: boolean;
    Debounce: boolean;
    TimerEndTimestamp?: number;
    StarterParams?: ReplicatableValue;
}

/** @internal */
export interface _internal_SkillState extends SkillState {
    _isActive_counter: number;
}

type ReadonlyState = ReadonlyDeep<SkillState>;

export interface SkillData {
    state: _internal_SkillState;
}

const registeredSkills = new Map<string, Constructor<Skill>>();
export class Skill<
    StarterParams extends ReplicatableValue = void,
    ServerToClientMessage extends ReplicatableValue = void,
    ClientToServerMessage extends ReplicatableValue = void,
> {
    /** @internal */
    protected readonly _janitor = new Janitor();
    protected readonly Janitor = new Janitor();
    protected readonly CooldownTimer = new Timer(1);

    public readonly Started = new Signal();
    public readonly Ended = new Signal();
    public readonly StateChanged = new Signal<(NewState: SkillState, OldState: SkillState) => void>();
    public readonly Destroyed = new Signal();

    protected StartCondition: () => boolean = () => true;
    protected MutualExclusives: Constructor<StatusEffect>[] = [];
    protected Requirements: Constructor<StatusEffect>[] = [];

    public Player?: Player;

    /** @internal */
    protected readonly isReplicated: boolean;
    private state: _internal_SkillState = {
        _isActive_counter: 0,
        IsActive: false,
        Debounce: false,
    };
    protected readonly Name = tostring(getmetatable(this));

    constructor(Character: Character);
    /**
     * @internal Reserved for internal usage
     */
    constructor(Character: Character, AllowClientInstantiation: (typeof Flags)["CanInstantiateSkillClient"]);
    constructor(
        public readonly Character: Character,
        AllowClientInstantiation?: (typeof Flags)["CanInstantiateSkillClient"],
    ) {
        if (!this.Character || tostring(getmetatable(this.Character)) !== "Character") {
            logError(`Not provided a valid character for Skill constructor`);
        }

        if (!getActiveHandler()) {
            logError(`Attempted to instantiate a skill before server has started.`);
        }

        if (RunService.IsClient() && AllowClientInstantiation !== Flags.CanInstantiateSkillClient) {
            logError(`Attempted to instantiate a skill on client`);
        }

        this.Player = Players.GetPlayerFromCharacter(this.Character.Instance);

        if (RunService.IsServer()) {
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
        });

        this._janitor.Add(
            this.StateChanged.Connect((New, Old) =>
                this._stateDependentCallbacks(New as _internal_SkillState, Old as _internal_SkillState),
            ),
        );

        this.Character._addSkill(this as Skill);
        this.isReplicated = RunService.IsClient();

        this.startReplication();
        if (!this.isReplicated) {
            rootProducer.setSkillData(this.Character.GetId(), this.Name, this.packData());
        }

        this.Construct();
    }

    /**
     * Server: Starts the skill
     * Client: Sends a request to server that will call :Start() on server
     */
    public Start(StarterParams: StarterParams) {
        const state = this.GetState();
        if (state.IsActive || state.Debounce) return;

        if (RunService.IsClient()) {
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

        if (!this.StartCondition()) return;

        this.SetState({
            IsActive: true,
            StarterParams: StarterParams,
            Debounce: false,
        });
    }

    /**
     * Force end the skill. This is automatically called after OnStartServer() is completed
     */
    public End() {
        if (RunService.IsClient()) {
            remotes._requestSkill.fire(this.Character.GetId(), this.Name, "End", undefined);
            return;
        }

        this.SetState({
            IsActive: false,
            StarterParams: undefined,
        });
        this.Janitor.Cleanup();
    }

    /**
     * Destroys the skill and removes it from the character
     */
    public Destroy() {
        if (RunService.IsServer()) {
            rootProducer.deleteSkillData(this.Character.GetId(), this.Name);
        }
        this._janitor.Cleanup();
    }

    /** @internal */
    protected _stateDependentCallbacks(State: _internal_SkillState, PreviousState: _internal_SkillState) {
        if (PreviousState._isActive_counter === State._isActive_counter) return;

        if (!PreviousState.IsActive && State.IsActive) {
            RunService.IsClient()
                ? this.OnStartClient(State.StarterParams as StarterParams)
                : this.OnStartServer(State.StarterParams as StarterParams);
            this.Started.Fire();
            if (RunService.IsServer()) this.End();
        } else if (PreviousState.IsActive && !State.IsActive) {
            RunService.IsClient() ? this.OnEndClient() : this.OnEndServer();
            this.Ended.Fire();
        }
        if (PreviousState.IsActive === State.IsActive && this.isReplicated) {
            this.OnStartClient(State.StarterParams as StarterParams);
            this.Started.Fire();
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
     * A shortcut for creating a damage container
     */
    protected CreateDamageContainer(Damage: number): DamageContainer {
        return {
            Damage: Damage,
            Source: this as Skill,
        };
    }

    protected ApplyCooldown(Duration: number) {
        if (!RunService.IsServer()) {
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

        table.freeze(newState);
        this.state = newState;

        if (RunService.IsServer()) {
            rootProducer.patchSkillData(this.Character.GetId(), this.Name, {
                state: newState,
            });
        }

        this.StateChanged.Fire(newState, oldState);
    }

    private startReplication() {
        if (!this.isReplicated) return;

        const proccessDataUpdate = (NewData?: SkillData, OldData?: SkillData) => {
            if (!NewData) return;
            if (!OldData) return;

            if (NewData.state !== OldData.state) {
                table.freeze(NewData.state);
                this.state = NewData.state;
                this.StateChanged.Fire(NewData.state, OldData.state);
            }
        };

        const dataSelector = SelectSkillData(this.Character.GetId(), this.Name);
        proccessDataUpdate(dataSelector(rootProducer.getState()));
        rootProducer.subscribe(dataSelector, proccessDataUpdate);
    }

    /**
     * Sends a message from the server to the client.
     */
    protected SendMessageToClient(Message: ServerToClientMessage) {
        if (!this.Player) return;

        if (!RunService.IsServer()) {
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

        if (!RunService.IsClient()) {
            logWarning(`Tried to send a message from server to server`);
            return;
        }

        remotes._messageToServer.fire(this.Character.GetId(), this.Name, Message);
    }

    private packData(): SkillData {
        return {
            state: this.state,
        };
    }

    /**
     * @deprecated Should not be used in Typescript: Specificly for LuaU Usage (functionality replaced by class constructor).
     */
    protected Construct() {}
    protected OnStartServer(StarterParams: StarterParams) {}
    protected OnStartClient(StarterParams: StarterParams) {}
    protected HandleClientMessage(Message: ClientToServerMessage) {}
    protected HandleServerMessage(Message: ServerToClientMessage) {}
    protected OnEndClient() {}
    protected OnEndServer() {}
}

/**
 * A decorator function that registers a skill.
 */
export function SkillDecorator<T extends Constructor<Skill>>(Constructor: T) {
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
