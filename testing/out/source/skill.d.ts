/// <reference types="signal" />
/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/compiler-types" />
import { Character, DamageContainer } from "./character";
import { Flags } from "./flags";
import { Constructor, ReadonlyDeep } from "./utility";
import { Janitor } from "@rbxts/janitor";
import { AnyStatus } from "./statusEffect";
import Signal from "@rbxts/signal";
import { Timer } from "@rbxts/timer";
export interface SkillState {
    IsActive: boolean;
    Debounce: boolean;
    MaxHoldTime?: number;
    TimerEndTimestamp?: number;
    StarterParams?: unknown;
}
export declare enum SkillType {
    Default = "Default",
    Holdable = "Holdable"
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
export interface SkillData {
    state: _internal_SkillState;
    constructorArguments: unknown[];
    metadata: unknown;
}
export type AnySkill = Skill<any, any[], any, any, any>;
export type UnknownSkill = Skill<unknown, unknown[], unknown, unknown, unknown>;
/**
 * A status effect class.
 */
export declare abstract class Skill<StarterParams = void, ConstructorArguments extends unknown[] = [], Metadata = void, ServerToClientMessage = void, ClientToServerMessage = void> {
    /** @internal @hidden */
    protected readonly _janitor: Janitor<void>;
    protected readonly Janitor: Janitor<void>;
    protected readonly CooldownTimer: Timer;
    protected readonly Character: Character;
    readonly Started: Signal<() => void, false>;
    readonly Ended: Signal<() => void, false>;
    readonly StateChanged: Signal<(NewState: SkillState, OldState: SkillState) => void, false>;
    readonly Destroyed: Signal<() => void, false>;
    readonly MetadataChanged: Signal<(NewMeta: Metadata | undefined, PreviousMeta: Metadata | undefined) => void, false>;
    /**
     * Checks whenever other skills should be non active for :Start() to procceed.
     */
    protected CheckOthersActive: boolean;
    protected MutualExclusives: Constructor<AnyStatus>[];
    protected Requirements: Constructor<AnyStatus>[];
    /** Whenever the start function should check if the skill is active/on cooldown on client side before firing a remote */
    protected CheckClientState: boolean;
    Player?: Player;
    /** @internal @hidden */
    protected readonly isReplicated: boolean;
    private state;
    private metadata?;
    protected readonly Name: string;
    protected readonly ConstructorArguments: ConstructorArguments;
    /** @internal @hidden */
    protected _skillType: SkillType;
    constructor(Character: Character, ...Args: ConstructorArguments);
    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    constructor(Props: SkillProps);
    /** @hidden @internal */
    protected _init(): void;
    /**
     * Server: Starts the skill
     * Client: Sends a request to server that will call :Start() on server
     */
    Start(StarterParams: StarterParams): void;
    /**
     * Force end the skill. This is automatically called after OnStartServer() is completed
     */
    End(): void;
    /** Retrieves the skill type */
    GetSkillType(): SkillType;
    /**
     * Destroys the skill and removes it from the character
     */
    Destroy(): void;
    /** @internal @hidden */
    protected _stateDependentCallbacks(State: _internal_SkillState, PreviousState: _internal_SkillState): void;
    GetState(): ReadonlyDeep<SkillState>;
    GetName(): string;
    /**
     * Sets the metadata of the skill.
     */
    protected SetMetadata(NewMeta: Metadata): void;
    /**
     * Gets the metadata of the skill
     * */
    GetMetadata(): Metadata | undefined;
    /**
     * A shortcut for creating a damage container
     */
    protected CreateDamageContainer(Damage: number): DamageContainer;
    protected ApplyCooldown(Duration: number): void;
    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    protected SetState(Patch: Partial<SkillState>): void;
    /**
     * Determines whether the skill should start or not.
     */
    protected ShouldStart(): boolean;
    /** @hidden @internal */
    _proccessDataUpdate(NewData?: SkillData, OldData?: SkillData): void;
    private startReplication;
    /**
     * Sends a message from the server to the client.
     */
    protected SendMessageToClient(Message: ServerToClientMessage): void;
    /**
     * Sends a message to the server.
     */
    protected SendMessageToServer(Message: ClientToServerMessage): void;
    private packData;
    /** Called after class gets instantiated (both client and server) */
    protected OnConstruct(...Args: ConstructorArguments): void;
    /** Called after class gets instantiated on client */
    protected OnConstructClient(...Args: ConstructorArguments): void;
    /** Called after class gets instantiated on server */
    protected OnConstructServer(...Args: ConstructorArguments): void;
    protected OnStartServer(StarterParams: StarterParams): void;
    protected OnStartClient(StarterParams: StarterParams): void;
    protected HandleClientMessage(Message: ClientToServerMessage): void;
    protected HandleServerMessage(Message: ServerToClientMessage): void;
    protected OnEndClient(): void;
    protected OnEndServer(): void;
}
/**
 * A decorator function that registers a skill.
 */
export declare function SkillDecorator<T extends Constructor<AnySkill>>(Constructor: T): void;
/**
 * Retrieves the constructor function of a registered skill by name.
 */
export declare function GetRegisteredSkillConstructor(Name: string): Constructor<UnknownSkill> | undefined;
