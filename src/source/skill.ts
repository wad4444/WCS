import { RunService } from "@rbxts/services";
import { Character } from "./character";
import { Flags } from "./flags";
import { Constructor, getActiveHandler, logError } from "./utility";
import { rootProducer } from "state/rootProducer";
import Signal from "@rbxts/rbx-better-signal";
import { Janitor } from "@rbxts/janitor";
import { SelectSkillData } from "state/selectors";

export interface SkillState {
    IsActive: boolean;
    Debounce: boolean;
    TimerEndTimestamp?: number;
}

export interface SkillData {
    state: SkillState;
}

const registeredSkills = new Map<string, Constructor<Skill>>();
export class Skill {
    private readonly janitor = new Janitor();

    public readonly Started = new Signal(this.janitor);
    public readonly Ended = new Signal(this.janitor);
    public readonly StateChanged = new Signal<(NewState: SkillState, OldState: SkillState) => void>(this.janitor);

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

        this.janitor.Add(
            this.StateChanged.Connect((State, PreviousState) => {
                if (!PreviousState.IsActive && State.IsActive) {
                    this.Started.Fire();
                    this.OnStartClient();
                } else if (PreviousState.IsActive && !State.IsActive) {
                    this.Ended.Fire();
                    this.OnEndClient();
                }
            }),
        );

        this.isReplicated = RunService.IsClient();
        rootProducer.setSkillData(this.Character.Instance, this.name, this.packData());
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
            rootProducer.patchSkillData(this.Character.Instance, this.name, {
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

        const dataSelector = SelectSkillData(this.Character.Instance, this.name);
        proccessDataUpdate(dataSelector(rootProducer.getState()));
        rootProducer.subscribe(dataSelector, proccessDataUpdate);
    }

    private packData(): SkillData {
        return {
            state: this.state,
        };
    }

    public Construct() {}
    public OnStartServer() {}
    public OnStartClient() {}
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
