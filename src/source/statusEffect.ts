import type { AffectableHumanoidProps, Character } from "./character";
import { Janitor } from "@rbxts/janitor";
import { RunService } from "@rbxts/services";
import { Constructor, ReadonlyDeep, getActiveHandler, logError } from "./utility";
import { FlagWithData, Flags } from "./flags";
import { Timer } from "@rbxts/timer";
import { rootProducer } from "state/rootProducer";
import { SelectStatusData } from "state/selectors";
import Signal from "@rbxts/rbx-better-signal";
import { deepCopy } from "@rbxts/deepcopy";

export interface StatusData {
    className: string;
    state: StatusEffectState;
    metadata?: Replicatable;
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
type Replicatable = object | number | string | boolean;

const registeredStatuses: Map<string, Constructor<StatusEffect>> = new Map();
let nextId = 0;
function generateId() {
    if (nextId > 9e9) {
        nextId = 0;
    }

    nextId += RunService.IsServer() ? 1 : -1;
    return tostring(nextId);
}

export class StatusEffect<T extends Replicatable = object> {
    public readonly MetadataChanged = new Signal<(NewMeta: T | undefined, PreviousMeta: T | undefined) => void>();
    public readonly StateChanged = new Signal<(State: ReadonlyState, PreviousState: ReadonlyState) => void>();
    public readonly HumanoidDataChanged = new Signal<
        (Data: HumanoidData | undefined, PreviousData: HumanoidData | undefined) => void
    >();
    public readonly Destroyed = new Signal();
    public DestroyOnEnd = true;

    private state: StatusEffectState = {
        IsActive: false,
    };
    private metadata?: T;
    private humanoidData?: HumanoidData;

    private isDestroyed = false;
    private readonly janitor = new Janitor();
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

        if (!this.isReplicated) {
            Character._addStatus(this as StatusEffect);
        }

        this.startReplicationClient();

        this.janitor.Add(this.Destroyed);
        this.janitor.Add(this.StateChanged);
        this.janitor.Add(this.MetadataChanged);

        if (RunService.IsServer()) {
            rootProducer.setStatusData(this.Character.Instance, this.id, this._packData());
        }
        this.Construct();
    }

    public Start(Time?: number) {
        this.SetState({
            IsActive: true,
        });

        if (!Time) return;
    }

    public SetHumanoidData(Mode: "Set" | "Increment", Props: Partial<AffectableHumanoidProps>, Priority = 1) {
        const newData = {
            Mode: Mode,
            Props: Props,
            Priority: Priority,
        };

        this.HumanoidDataChanged.Fire(newData, this.humanoidData);
        this.humanoidData = newData;

        if (RunService.IsServer()) {
            rootProducer.patchStatusData(this.Character.Instance, this.id, {
                humanoidData: this.humanoidData,
            });
        }
    }

    public ClearHumanoidData() {
        this.HumanoidDataChanged.Fire(undefined, this.humanoidData);
        this.humanoidData = undefined;

        if (RunService.IsServer()) {
            rootProducer.patchStatusData(this.Character.Instance, this.id, {
                humanoidData: undefined,
            });
        }
    }

    public ClearMetadata() {
        if (this.isReplicated) {
            logError(
                `Cannot :ClearMetadata() of replicated status effect on client! \n This can lead to a possible desync`,
            );
        }

        this.MetadataChanged.Fire(undefined, this.metadata);
        this.metadata = undefined;

        if (RunService.IsServer()) {
            rootProducer.patchStatusData(this.Character.Instance, this.id, {
                metadata: undefined,
            });
        }
    }

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
            rootProducer.patchStatusData(this.Character.Instance, this.id, {
                state: newState,
            });
        }
    }

    protected SetMetadata(NewMeta: T) {
        if (this.isReplicated) {
            logError(
                `Cannot :SetMetadata() of replicated status effect on client! \n This can lead to a possible desync`,
            );
        }

        this.MetadataChanged.Fire(NewMeta, this.metadata);
        this.metadata = NewMeta;

        if (RunService.IsServer()) {
            rootProducer.patchStatusData(this.Character.Instance, this.id, {
                metadata: NewMeta,
            });
        }
    }

    public GetState() {
        return table.clone(this.state) as ReadonlyState;
    }

    public GetHumanoidData() {
        return this.humanoidData !== undefined ? deepCopy(this.humanoidData) : undefined;
    }

    public GetMetadata() {
        let cloned: T | undefined = this.metadata;
        if (typeIs(this.metadata, "table")) {
            cloned = table.clone(this.metadata);
        }

        return cloned;
    }

    public IsDestroyed() {
        return this.isDestroyed;
    }

    public GetId() {
        return this.id;
    }

    public Destroy() {
        this.janitor.Cleanup();
        rootProducer.deleteStatusData(this.Character.Instance, this.id);
        this.Destroyed.Fire();
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

        const processDataUpdate = (StatusData?: StatusData) => {
            if (!StatusData) return;

            if (StatusData.state !== this.state) {
                this.StateChanged.Fire(StatusData.state, this.state);
                this.state = StatusData.state;
            }

            if (StatusData.metadata !== this.metadata) {
                this.MetadataChanged.Fire(StatusData.metadata as T | undefined, this.metadata);
                this.metadata = StatusData.metadata as T | undefined;
            }

            print(StatusData.humanoidData)
            if (StatusData.humanoidData !== this.humanoidData) {
                this.HumanoidDataChanged.Fire(StatusData.humanoidData, this.humanoidData);
                this.humanoidData = StatusData.humanoidData;
            }
        };
        const subscription = rootProducer.subscribe(
            SelectStatusData(this.Character.Instance, this.id),
            processDataUpdate,
        );

        this.janitor.Add(
            this.StateChanged.Connect((State, PreviousState) => {
                if (!PreviousState.IsActive && State.IsActive) {
                    this.OnStartClient();
                } else if (PreviousState.IsActive && !State.IsActive) {
                    this.OnEndClient();
                }
            }),
        );

        processDataUpdate(SelectStatusData(this.Character.Instance, this.id)(rootProducer.getState()));

        this.janitor.Add(subscription);
    }

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
