/// <reference types="@rbxts/compiler-types" />
/// <reference types="signal" />
import type { AffectableHumanoidProps, Character, DamageContainer } from "./character";
import { Constructor, ReadonlyDeep } from "./utility";
import { FlagWithData } from "./flags";
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
type ReadonlyState = ReadonlyDeep<StatusEffectState>;
export type AnyStatus = StatusEffect<any, any[]>;
export type UnknownStatus = StatusEffect<unknown, unknown[]>;
/**
 * A status effect class.
 */
export declare class StatusEffect<Metadata = void, ConstructorArguments extends unknown[] = []> {
    private readonly janitor;
    readonly MetadataChanged: Signal<(NewMeta: Metadata | undefined, PreviousMeta: Metadata | undefined) => void, false>;
    readonly StateChanged: Signal<(State: ReadonlyState, PreviousState: ReadonlyState) => void, false>;
    readonly HumanoidDataChanged: Signal<(Data: HumanoidData | undefined, PreviousData: HumanoidData | undefined) => void, false>;
    readonly Destroyed: Signal<() => void, false>;
    readonly Started: Signal<() => void, false>;
    readonly Ended: Signal<() => void, false>;
    protected readonly Character: Character;
    DestroyOnEnd: boolean;
    private state;
    private metadata?;
    private humanoidData?;
    private isDestroyed;
    private readonly timer;
    private readonly id;
    private readonly isReplicated;
    protected readonly ConstructorArguments: ConstructorArguments;
    constructor(Character: Character, ...Args: ConstructorArguments);
    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    constructor(Character: StatusEffectProps);
    /**
     * Starts the status effect.
     */
    Start(Time?: number): void;
    /**
     * Stops the status effect.
     */
    End(): void;
    /**
     * Paused the status effect.
     */
    Pause(): void;
    /**
     * Resumes the status effect.
     */
    Resume(): void;
    /**
     * Stops the status effect.
     */
    Stop(): void;
    /**
     * Sets the humanoid data that is going to be applied to the character while the status effect is active.
     */
    SetHumanoidData(Props: HumanoidData["Props"], Priority?: number): void;
    /**
     * Clear the humanoid data.
     */
    ClearHumanoidData(): void;
    /**
     * Clears the metadata
     */
    ClearMetadata(): void;
    /**
     * Sets the state of the status effect.
     */
    protected SetState(Patch: Partial<StatusEffectState>): void;
    /**
     * Sets the metadata of the status effect.
     */
    protected SetMetadata(NewMeta: Metadata): void;
    /**
     * Gets the state of the status effect
     * */
    GetState(): ReadonlyDeep<StatusEffectState>;
    /**
     * Gets the humanoid data of the status effect
     */
    GetHumanoidData(): HumanoidData | undefined;
    /**
     * Gets the metadata of the status effect
     */
    GetMetadata(): Metadata | undefined;
    /**
     * Returns true if the status effect is destroyed
     */
    IsDestroyed(): boolean;
    /**
     * Gets the id of the status effect
     */
    GetId(): string;
    /**
     * A method that is used to modify damage applied to a character
     */
    HandleDamage(Modified: number, Original: number): number;
    /**
     * Destroys the status effect and removes it from the character
     */
    Destroy(): void;
    /**
     * A shortcut for creating a damage container
     */
    protected CreateDamageContainer(Damage: number): DamageContainer;
    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    _packData(): StatusData;
    private stateDependentCallbacks;
    /** @hidden @internal */
    _proccessDataUpdate(StatusData?: StatusData, PreviousData?: StatusData): void;
    private startReplicationClient;
    /** Called after class gets instantiated (both client and server) */
    protected OnConstruct(...Args: ConstructorArguments): void;
    /** Called after class gets instantiated on client */
    protected OnConstructClient(...Args: ConstructorArguments): void;
    /** Called after class gets instantiated on server */
    protected OnConstructServer(...Args: ConstructorArguments): void;
    protected OnStartServer(): void;
    protected OnStartClient(): void;
    protected OnEndClient(): void;
    protected OnEndServer(): void;
}
export declare function StatusEffectDecorator<T extends Constructor<AnyStatus>>(Constructor: T): void;
export declare function GetRegisteredStatusEffectConstructor(Name: string): Constructor<UnknownStatus> | undefined;
export {};
