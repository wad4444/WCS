/* eslint-disable roblox-ts/no-array-pairs */
import { Players, RunService } from "@rbxts/services";
import { Character, DamageContainer } from "./character";
import { Flags } from "./flags";
import { Constructor, ReadonlyDeep, ReplicatableValue, getActiveHandler, logError, logWarning } from "./utility";
import Signal from "@rbxts/rbx-better-signal";
import { Janitor } from "@rbxts/janitor";
import { SelectSkillData } from "state/selectors";
import { remotes } from "./remotes";
import { rootProducer } from "state/rootProducer";
import { StatusEffect } from "./statusEffect";

export interface SkillState {
    IsActive: boolean;
    Debounce: boolean;
    TimerEndTimestamp?: number;
    StarterParams?: ReplicatableValue;
}

type ReadonlyState = ReadonlyDeep<SkillState>;

export interface SkillData {
    state: SkillState;
}

const registeredSkills = new Map<string, Constructor<Skill>>();
export class Skill<
    StarterParams extends ReplicatableValue = void,
    ServerToClientMessage extends ReplicatableValue = void,
    ClientToServerMessage extends ReplicatableValue = void,
> {
    private readonly janitor = new Janitor();
    protected readonly Janitor = new Janitor();

    public readonly Started = new Signal(this.janitor);
    public readonly Ended = new Signal(this.janitor);
    public readonly StateChanged = new Signal<(NewState: SkillState, OldState: SkillState) => void>(this.janitor);
    public readonly Destroyed = new Signal(this.janitor);

    protected StartCondition: () => boolean = () => true;
    protected MutualExclusives: Constructor<StatusEffect>[] = [];
    protected Requirements: Constructor<StatusEffect>[] = [];

    public Player?: Player;

    private isReplicated: boolean;
    private state: SkillState = {
        IsActive: false,
        Debounce: false,
    };
    private name = tostring(getmetatable(this));

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
            this.janitor.Add(
                remotes._messageToServer.connect((Player, CharacterId, SkillName, Message) => {
                    if (Player !== this.Player) return;
                    if (SkillName !== this.name) return;
                    if (CharacterId !== this.Character.GetId()) return;

                    this.HandleClientMessage(Message as ClientToServerMessage);
                }),
            );
        } else {
            this.janitor.Add(
                remotes._messageToClient.connect((CharacterId, SkillName, Message) => {
                    if (SkillName !== this.name) return;
                    if (CharacterId !== this.Character.GetId()) return;

                    this.HandleServerMessage(Message as ServerToClientMessage);
                }),
            );
        }

        this.janitor.Add(
            this.StateChanged.Connect((State, PreviousState) => {
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
            }),
        );

        this.Character._addSkill(this as Skill);
        this.isReplicated = RunService.IsClient();

        this.startReplication();
        if (!this.isReplicated) {
            rootProducer.setSkillData(this.Character.GetId(), this.name, this.packData());
        }

        this.Construct();
    }

    /**
     * Server: Starts the skill
     * Client: Sends a request to server that will call :Start() on server
     */
    public Start(StarterParams: StarterParams) {
        if (RunService.IsClient()) {
            remotes._startSkill.fire(this.Character.GetId(), this.name, StarterParams);
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
        rootProducer.deleteSkillData(this.Character.GetId(), this.name);
        this.janitor.Cleanup();
    }

    public GetState() {
        return this.state as ReadonlyState;
    }

    public GetName() {
        return this.name;
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

    /**
     * Set the state of the skill.
     * @param Patch The patch to apply to the state
     */
    protected SetState(Patch: Partial<SkillState>) {
        if (this.isReplicated) {
            logError(`Cannot :SetState() of replicated status effect on client! \n This can lead to a possible desync`);
        }

        const newState = {
            ...this.state,
            ...Patch,
        };
        table.freeze(newState);

        this.StateChanged.Fire(newState, this.state);
        this.state = newState;

        if (RunService.IsServer()) {
            rootProducer.patchSkillData(this.Character.GetId(), this.name, {
                state: newState,
            });
        }
    }

    private startReplication() {
        if (!this.isReplicated) return;

        const proccessDataUpdate = (NewData?: SkillData) => {
            if (!NewData) return;

            if (NewData.state !== this.state) {
                const previousState = this.state;
                table.freeze(NewData.state);
                this.state = NewData.state;
                this.StateChanged.Fire(NewData.state, previousState);
            }
        };

        const dataSelector = SelectSkillData(this.Character.GetId(), this.name);
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

        remotes._messageToClient.fire(this.Player, this.Character.GetId(), this.name, Message);
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

        remotes._messageToServer.fire(this.Character.GetId(), this.name, Message);
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
