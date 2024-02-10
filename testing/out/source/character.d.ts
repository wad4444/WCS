/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/compiler-types" />
/// <reference types="@rbxts/compiler-types" />
/// <reference types="signal" />
import { Constructor } from "./utility";
import { AnyStatus, StatusData, UnknownStatus } from "./statusEffect";
import { FlagWithData } from "./flags";
import { AnySkill, SkillData, UnknownSkill } from "./skill";
import { Moveset } from "./moveset";
import Signal from "@rbxts/signal";
export interface CharacterData {
    instance: Instance;
    statusEffects: Map<string, StatusData>;
    skills: Map<string, SkillData>;
    moveset: string | undefined;
    defaultProps: AffectableHumanoidProps;
}
export interface DamageContainer {
    Damage: number;
    Source: UnknownStatus | UnknownSkill | undefined;
}
export type AffectableHumanoidProps = Pick<Humanoid, "WalkSpeed" | "JumpPower" | "AutoRotate" | "JumpHeight">;
export declare class Character {
    private static readonly currentCharMap;
    static readonly CharacterCreated: Signal<(Character: Character) => void, false>;
    static readonly CharacterDestroyed: Signal<(Character: Character) => void, false>;
    readonly Instance: Instance;
    readonly Humanoid: Humanoid;
    readonly Player?: Player;
    private readonly janitor;
    readonly StatusEffectAdded: Signal<(Status: UnknownStatus) => void, false>;
    readonly StatusEffectRemoved: Signal<(Status: UnknownStatus) => void, false>;
    /**
     * Fires only on client if the character belongs to a player
     */
    readonly HumanoidPropertiesUpdated: Signal<(NewProperties: AffectableHumanoidProps) => void, false>;
    /**
     * Container's source will always be nil on client
     */
    readonly DamageTaken: Signal<(Container: DamageContainer) => void, false>;
    readonly Destroyed: Signal<() => void, false>;
    readonly MovesetChanged: Signal<(NewMoveset: string | undefined, OldMoveset: string | undefined) => void, false>;
    private readonly statusEffects;
    private readonly skills;
    private defaultsProps;
    private id;
    private moveset?;
    private destroyed;
    constructor(Instance: Instance);
    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    constructor(Instance: Instance, canCreateClient: FlagWithData<string>);
    GetId(): string;
    /**
     * Destroys the object and performs necessary cleanup tasks.
     * You usually suppost to fire this manually when your humanoid dies.
     */
    Destroy(): void;
    IsDestroyed(): boolean;
    /**
     * @returns The damage that was actually taken.
     */
    TakeDamage(Container: DamageContainer): {
        Damage: number;
        Source: UnknownStatus | UnknownSkill | undefined;
    } | undefined;
    /** Predicts the estimated damage in health after the status effect appliement */
    PredictDamage(Container: DamageContainer): {
        Damage: number;
        Source: UnknownStatus | UnknownSkill | undefined;
    } | undefined;
    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    _addStatus(Status: AnyStatus): void;
    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    _addSkill(Skill: AnySkill): void;
    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    _packData(): CharacterData;
    SetDefaultProps(Props: AffectableHumanoidProps): void;
    /**
     * This function returns the default humanoid properties of the character.
     */
    GetDefaultsProps(): AffectableHumanoidProps;
    /**
     * Returns the map of all characters to their instances.
     */
    static GetCharacterMap_TS(): ReadonlyMap<Instance, Character>;
    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    static GetCharacterFromId_TS(Id: string): Character | undefined;
    /**
     * Retrieves the character associated with the given instance.
     */
    static GetCharacterFromInstance_TS(Instance: Instance): Character | undefined;
    /**
     * @internal Reserved for LuaU usage
     * @hidden
     */
    GetCharacterMap(this: void): ReadonlyMap<Instance, Character>;
    /**
     * @internal Reserved for LuaU usage
     * @hidden
     */
    GetCharacterFromInstance(this: void, Instance: Instance): Character | undefined;
    /**
     * Retrieves all status effects.
     */
    GetAllStatusEffects(): UnknownStatus[];
    /**
     * Retrieves all active status effects.
     */
    GetAllActiveStatusEffects(): UnknownStatus[];
    /**
     * Retrieves all status effects of a given type.
     */
    GetAllStatusEffectsOfType<T extends object>(Constructor: Constructor<T>): UnknownStatus[];
    /**
     * Retrieves all active status effects of a specific type.
     */
    GetAllActiveStatusEffectsOfType<T extends object>(Constructor: Constructor<T>): UnknownStatus[];
    /**
     * Checks if character has any active status effects of the speicified type.
     */
    HasStatusEffects(Constructors: Constructor<AnyStatus>[]): boolean;
    /**
     * Retrieves the skills stored in the skills object and returns them as an array.
     */
    GetSkills(): UnknownSkill[];
    /**
     * Retrieves all active skills.
     */
    GetAllActiveSkills(): UnknownSkill[];
    /**
     * Retrieves a skill from the skills map based on a given name.
     */
    GetSkillFromString(Name: string): UnknownSkill | undefined;
    /**
     * Retrieves a skill instance from the skills map based on the provided constructor.
     */
    GetSkillFromConstructor<T extends UnknownSkill>(Constructor: Constructor<T>): T | undefined;
    /**
     * Apply a moveset to the character.
     */
    ApplyMoveset(Moveset: string): void;
    ApplyMoveset(Moveset: Moveset): void;
    /**
     * Returns the current moveset name.
     */
    GetMoveset(): string | undefined;
    /**
     * Gets the skills that belong to a provided moveset.
     * Default - Currently applied moveset
     */
    GetMovesetSkills(Moveset?: string | undefined): AnySkill[] | undefined;
    /**
     * Clears the moveset and destroys all skills.
     */
    ClearMoveset(): void;
    /**
     * Apply the skills from a given Moveset.
     * Does not set the moveset and just applies the skills.
     */
    ApplySkillsFromMoveset(Moveset: Moveset): void;
    private setupReplication_Client;
    private updateHumanoidProps;
}
