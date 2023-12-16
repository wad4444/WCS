/* eslint-disable roblox-ts/no-array-pairs */
import { Players, RunService } from "@rbxts/services";
import { Character } from "./character";
import { Flags } from "./flags";
import { Constructor, ReadonlyDeep, Replicatable, getActiveHandler, logError, logWarning } from "./utility";
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
    StarterParams?: Replicatable;
}

type ReadonlyState = ReadonlyDeep<SkillState>;
type ReplicatableQM = Replicatable | undefined;

export interface SkillData {
    state: SkillState;
}

const registeredSkills = new Map<string, Constructor<Skill>>();
export class Skill<
    StarterParams extends ReplicatableQM = undefined,
    ServerToClientMessage extends ReplicatableQM = undefined,
    ClientToServerMessage extends ReplicatableQM = undefined,
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
                remotes._messageToServer.connect((Player, Character, SkillName, Message) => {
                    if (Player !== this.Player) return;
                    if (SkillName !== this.name) return;
                    if (Character !== this.Character.Instance) return;

                    this.HandleClientMessage(Message as ClientToServerMessage);
                }),
            );
        } else {
            this.janitor.Add(
                remotes._messageToClient.connect((Character, SkillName, Message) => {
                    if (SkillName !== this.name) return;
                    if (Character !== this.Character.Instance) return;

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
                    RunService.IsServer() ?? this.End();
                } else if (PreviousState.IsActive && !State.IsActive) {
                    RunService.IsClient() ? this.OnEndClient() : this.OnEndServer();
                    this.Ended.Fire();
                }
            }),
        );

        this.isReplicated = RunService.IsClient();
        rootProducer.setSkillData(this.Character.GetId(), this.name, this.packData());
    }

    public Start(StarterParams: StarterParams) {
        if (this.GetState().IsActive) {
            logWarning("Can't start an active skill");
            return;
        }

        if (RunService.IsClient()) {
            remotes._startSkill.fire(this.Character.Instance, this.name, StarterParams);
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

    public End() {
        this.SetState({
            IsActive: false,
            StarterParams: undefined,
        });
        this.Janitor.Cleanup();
    }

    public GetState() {
        return table.clone(this.state) as ReadonlyState;
    }

    public GetName() {
        return this.name;
    }

    protected SetState(Patch: Partial<SkillState>) {
        if (this.isReplicated) {
            logError(`Cannot :SetState() of replicated status effect on client! \n This can lead to a possible desync`);
        }

        const newState = {
            ...this.state,
            ...Patch,
        };

        this.StateChanged.Fire(newState, this.state);
        this.state = newState;

        this.isReplicated ?? this.startReplication();

        if (RunService.IsServer()) {
            rootProducer.patchSkillData(this.Character.GetId(), this.name, {
                state: newState,
            });
        }
    }

    private startReplication() {
        if (!RunService.IsClient()) return;

        const proccessDataUpdate = (NewData?: SkillData) => {
            if (!NewData) return;

            if (NewData.state !== this.state) {
                this.StateChanged.Fire(NewData.state, this.state);
                this.state = NewData.state;
            }
        };

        const dataSelector = SelectSkillData(this.Character.GetId(), this.name);
        proccessDataUpdate(dataSelector(rootProducer.getState()));
        rootProducer.subscribe(dataSelector, proccessDataUpdate);
    }

    protected SendMessageToClient(Message: ServerToClientMessage) {
        if (!this.Player) return;

        if (!RunService.IsServer()) {
            logWarning(`Tried to send a message from client to client`);
            return;
        }

        remotes._messageToClient.fire(this.Player, this.Character.Instance, this.name, Message);
    }

    protected SendMessageToServer(Message: ClientToServerMessage) {
        if (!this.Player) return;

        if (!RunService.IsClient()) {
            logWarning(`Tried to send a message from server to server`);
            return;
        }

        remotes._messageToServer.fire(this.Character.Instance, this.name, Message);
    }

    private packData(): SkillData {
        return {
            state: this.state,
        };
    }

    public Construct() {}
    public OnStartServer(StarterParams: StarterParams) {}
    public OnStartClient(StarterParams: StarterParams) {}
    public HandleClientMessage(Message: ClientToServerMessage) {}
    public HandleServerMessage(Message: ServerToClientMessage) {}
    public OnEndClient() {}
    public OnEndServer() {}
}

export function SkillDecorator<T extends Constructor<Skill>>(Constructor: T) {
    const name = tostring(Constructor);
    if (registeredSkills.has(name)) {
        logError(`StatusEffect with name ${name} was already registered before`);
    }

    registeredSkills.set(name, Constructor);
}

export function GetRegisteredSkillConstructor(Name: string) {
    return registeredSkills.get(Name);
}
