type void = nil;

export type Callback = () -> void;

export type Server = {
    FilterReplicatedCharacters: (Player, Character) -> boolean;
    Start: (Server) -> void;
    RegisterDirectory: (Server, Instance) -> void;
    IsActive: () -> boolean;
}

export type Client = {
    Start: (Client) -> void;
    RegisterDirectory: (Client, Instance) -> void;
    IsActive: () -> boolean;
}

export type ReadonlySignal<T = Callback> = {
    Connect: (ReadonlySignal<T>, T) -> RBXScriptConnection;
    Once: (ReadonlySignal<T>, T) -> RBXScriptConnection;
    Wait: (ReadonlySignal<T>) -> void;
}

type StatusEffectState = {
    IsActive: boolean;
}
type Partial_StatusEffectState = {
    IsActive: boolean?;
}

type Moveset = {
    Name: string;
    Skills: {SkillConstructor};
}

type HumanoidData = {
    Mode: "Set" | "Increment";
    Props: Partial_AffectableHumanoidProps;
    Priority: number;
}
type Partial_HumanoidData = {
    Mode: ("Set" | "Increment")?;
    Props: Partial_AffectableHumanoidProps?;
    Priority: number?;
}

export type StatusEffect<T = any> = {
    MetadataChanged: ReadonlySignal<(T?, T?) -> void>;
    StateChanged: ReadonlySignal<(StatusEffectState, StatusEffectState) -> void>;
    HumanoidDataChanged: ReadonlySignal<(HumanoidData?, HumanoidData?) -> void>;
    Destroyed: ReadonlySignal;
    Started: ReadonlySignal;
    Ended: ReadonlySignal;

    DestroyOnEnd: boolean;
    
    Start: (StatusEffect, number?) -> void;
    End: (StatusEffect) -> void;
    Pause: (StatusEffect) -> void;
    Resume: (StatusEffect) -> void;
    Stop: (StatusEffect) -> void;
    SetHumanoidData: (StatusEffect, Partial_HumanoidData) -> void;
    ClearHumanoidData: (StatusEffect) -> void;
    ClearMetadata: (StatusEffect) -> void;
    SetState: (StatusEffect, Partial_StatusEffectState) -> void;
    SetMetadata: (StatusEffect, T) -> void;
    GetState: (StatusEffect) -> StatusEffectState;
    GetHumanoidData: (StatusEffect) -> HumanoidData;
    GetMetadata: (StatusEffect) -> T;
    IsDestroyed: (StatusEffect) -> boolean;
    GetId: (StatusEffect) -> string;
    Destroy: (StatusEffect) -> void;
    Construct: (StatusEffect) -> void;
    OnStartServer: (StatusEffect) -> void;
    OnStartClient: (StatusEffect) -> void;
    OnEndClient: (StatusEffect) -> void;
    OnEndServer: (StatusEffect) -> void;
    CreateDamageContainer: (StatusEffect, number) -> DamageContainer,
}

export type StatusEffectConstructor = {
    new: (Character) -> StatusEffect
}

type Replicatable = table | number | string | boolean | CFrame | Vector3;

type SkillState = {
    IsActive: boolean,
    Debounce: boolean,
    TimerEndTimestamp: number?,
    StarterParams: Replicatable?,
}

type SkillData = {
    state: SkillState,
}

type BooleanOrString = boolean | string;
type Janitor = {
	ClassName: "Janitor",
	CurrentlyCleaning: boolean,
	SuppressInstanceReDestroy: boolean,

	Add: <T>(self: Janitor, Object: T, MethodName: BooleanOrString?, Index: any?) -> T,
	AddPromise: <T>(self: Janitor, PromiseObject: T) -> T,

	Remove: (self: Janitor, Index: any) -> Janitor,
	RemoveNoClean: (self: Janitor, Index: any) -> Janitor,

	RemoveList: (self: Janitor, ...any) -> Janitor,
	RemoveListNoClean: (self: Janitor, ...any) -> Janitor,

	Get: (self: Janitor, Index: any) -> any?,
	GetAll: (self: Janitor) -> {[any]: any},

	Cleanup: (self: Janitor) -> (),
	Destroy: (self: Janitor) -> (),

	LinkToInstance: (self: Janitor, Object: Instance, AllowMultiple: boolean?) -> RBXScriptConnection,
	LegacyLinkToInstance: (self: Janitor, Object: Instance, AllowMultiple: boolean?) -> RbxScriptConnection,

	LinkToInstances: (self: Janitor, ...Instance) -> Janitor,
}

type DamageContainer = {
    Damage: number;
    Source: Skill | StatusEffect | void;
}

type Skill = {
    Janitor: Janitor,
    Started: ReadonlySignal,
    Ended: ReadonlySignal,
    StateChanged: ReadonlySignal<(NewState: SkillState, OldState: SkillState) -> ()>,
    Destroyed: ReadonlySignal,
    StartCondition: () -> boolean,
    MutualExclusives: {StatusEffectConstructor},
    Requirements: {StatusEffectConstructor},
    Player: Player?,
    Character: Character,
    HandleClientMessage: (Skill, ClientToServerMessage) -> void,
    HandleServerMessage: (Skill, ServerToClientMessage) -> void,
    GetName: (Skill) -> string,
    OnStartServer: (Skill, StarterParams) -> void,
    OnStartClient: (Skill, StarterParams) -> void,
    OnEndServer: (Skill) -> void,
    OnEndClient: (Skill) -> void,
    GetState: (Skill) -> SkillState,
    End: (Skill) -> void,
    CreateDamageContainer: (Skill, number) -> DamageContainer,
    Destroy: (Skill) -> void,
}

export type SkillConstructor = {
    new: (Character) -> Skill
}

type AffectableHumanoidProps = {
    WalkSpeed: number;
    JumpPower: number;
    JumpHeight: number;
    AutoRotate: boolean;
}
type Partial_AffectableHumanoidProps = {
    WalkSpeed: number?;
    JumpPower: number?;
    JumpHeight: number?;
    AutoRotate: boolean?;
}

export type Character = {
    Instance: Instance;
    Humanoid: Humanoid;
    Player: Player?;

    StatusEffectAdded: ReadonlySignal<(StatusEffect) -> void>;
    StatusEffectRemoved: ReadonlySignal<(StatusEffect) -> void>;
    DamageTaken: ReadonlySignal<(number) -> void>;
    Destroyed: ReadonlySignal;

    Destroy: () -> void;
    GetId: () -> string;

    SetDefaultProps: (Character, AffectableHumanoidProps) -> void;
    GetDefaultProps: (Character) -> AffectableHumanoidProps;
    GetAllStatusEffects: (Character) -> {StatusEffect};
    GetAllActiveStatusEffects: (Character) -> {StatusEffect};
    GetAllStatusStatusEffectsOfType: (Character, StatusEffectConstructor) -> {StatusEffect};
    GetAllActiveStatusStatusEffectsOfType: (Character, StatusEffectConstructor) -> {StatusEffect};
    HasStatusEffects: (Character, {StatusEffectConstructor}) -> boolean;
    GetSkillByString: (Character, string) -> Skill?;
    GetSkillByConstructor: (Character, SkillConstructor) -> Skill?;
    ApplyMoveset: (Character, Moveset) -> void;
    GetMoveset: (Character) -> Moveset;
    ClearMoveset: (Character) -> void;
    ApplySkillsFromMoveset: (Character, Moveset) -> void;
    TakeDamage: (DamageContainer) -> DamageContainer;
}

export type CharacterClass = {
    CharacterCreated: ReadonlySignal<(Character) -> void>;
    CharacterDestroyed: ReadonlySignal<(Character) -> void>;

    new: (Instance) -> Character;
    GetCharacterMap: () -> {[Instance]: Character};
    GetCharacterFromInstance: (Instance) -> Character?;
}

export type WCS = {
    CreateServer: () -> Handler;
    CreateClient: () -> Handler;
    CreateMoveset: (string) -> Moveset;
    RegisterStatusEffect: (string) -> StatusEffect;
    RegisterSkill: (string) -> Skill;
    Character: CharacterClass;
    Types: {}
}

return nil