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
    Skills: {SkillConstructor<any, any, any>};
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
    Destroyed: ReadonlySignal<Callback>;
    Started: ReadonlySignal<Callback>;
    Ended: ReadonlySignal<Callback>;
    Character: Character;

    DestroyOnEnd: boolean;
    
    Start: (StatusEffect<T>, number?) -> void;
    End: (StatusEffect<T>) -> void;
    Pause: (StatusEffect<T>) -> void;
    Resume: (StatusEffect<T>) -> void;
    Stop: (StatusEffect<T>) -> void;
    SetHumanoidData: (StatusEffect<T>, Partial_HumanoidData) -> void;
    ClearHumanoidData: (StatusEffect<T>) -> void;
    ClearMetadata: (StatusEffect<T>) -> void;
    SetState: (StatusEffect<T>, Partial_StatusEffectState) -> void;
    SetMetadata: (StatusEffect<T>, T) -> void;
    GetState: (StatusEffect<T>) -> StatusEffectState;
    GetHumanoidData: (StatusEffect<T>) -> HumanoidData;
    GetMetadata: (StatusEffect<T>) -> T;
    IsDestroyed: (StatusEffect<T>) -> boolean;
    GetId: (StatusEffect<T>) -> string;
    Destroy: (StatusEffect<T>) -> void;
    Construct: (StatusEffect<T>) -> void;
    OnStartServer: (StatusEffect<T>) -> void;
    OnStartClient: (StatusEffect<T>) -> void;
    OnEndClient: (StatusEffect<T>) -> void;
    OnEndServer: (StatusEffect<T>) -> void;
    CreateDamageContainer: (StatusEffect<T>, number) -> DamageContainer,
}

export type StatusEffectConstructor<T = any> = {
    new: (Character) -> StatusEffect<T>
}

type Replicatable = table | number | string | boolean | CFrame | Vector3 | nil;

type SkillState = {
    IsActive: boolean,
    Debounce: boolean,
    TimerEndTimestamp: number?,
    StarterParams: Replicatable?,
}

type SkillData = {
    state: SkillState,
}

type RbxScriptConnection = {
    Disconnect: (RbxScriptConnection) -> void;
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
    Source: Skill<any, any, any> | StatusEffect<any> | void;
}

type Skill<StarterParams, ClientToServerMessage, ServerToClientMessage> = {
    Janitor: Janitor,
    Started: ReadonlySignal<Callback>,
    Ended: ReadonlySignal<Callback>,
    StateChanged: ReadonlySignal<(NewState: SkillState, OldState: SkillState) -> ()>,
    Destroyed: ReadonlySignal<Callback>,
    StartCondition: () -> boolean,
    MutualExclusives: {StatusEffectConstructor<any>},
    Requirements: {StatusEffectConstructor<any>},
    Player: Player?,
    Character: Character,
    HandleClientMessage: (Skill<StarterParams, ClientToServerMessage, ServerToClientMessage>, ClientToServerMessage) -> void,
    HandleServerMessage: (Skill<StarterParams, ClientToServerMessage, ServerToClientMessage>, ServerToClientMessage) -> void,
    SendMessageToClient: (Skill<StarterParams, ClientToServerMessage, ServerToClientMessage>, ServerToClientMessage) -> void,
    SendMessageToServer: (Skill<StarterParams, ClientToServerMessage, ServerToClientMessage>, ClientToServerMessage) -> void,
    GetName: (Skill<StarterParams, ClientToServerMessage, ServerToClientMessage>) -> string,
    OnStartServer: (Skill<StarterParams, ClientToServerMessage, ServerToClientMessage>, StarterParams) -> void,
    OnStartClient: (Skill<StarterParams, ClientToServerMessage, ServerToClientMessage>, StarterParams) -> void,
    OnEndServer: (Skill<StarterParams, ClientToServerMessage, ServerToClientMessage>) -> void,
    OnEndClient: (Skill<StarterParams, ClientToServerMessage, ServerToClientMessage>) -> void,
    GetState: (Skill<StarterParams, ClientToServerMessage, ServerToClientMessage>) -> SkillState,
    End: (Skill<StarterParams, ClientToServerMessage, ServerToClientMessage>) -> void,
    CreateDamageContainer: (Skill<StarterParams, ClientToServerMessage, ServerToClientMessage>, number) -> DamageContainer,
    Destroy: (Skill<StarterParams, ClientToServerMessage, ServerToClientMessage>) -> void,
}

export type SkillConstructor<StarterParams, ClientToServerMessage, ServerToClientMessage> = {
    new: (Character) -> Skill<StarterParams, ClientToServerMessage, ServerToClientMessage>
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

    StatusEffectAdded: ReadonlySignal<(StatusEffect<any>) -> void>;
    StatusEffectRemoved: ReadonlySignal<(StatusEffect<any>) -> void>;
    DamageTaken: ReadonlySignal<(number) -> void>;
    Destroyed: ReadonlySignal<Callback>;

    Destroy: () -> void;
    GetId: () -> string;

    SetDefaultProps: (Character, AffectableHumanoidProps) -> void;
    GetDefaultProps: (Character) -> AffectableHumanoidProps;
    GetAllStatusEffects: (Character) -> {StatusEffect<any>};
    GetAllActiveStatusEffects: (Character) -> {StatusEffect<any>};
    GetAllStatusStatusEffectsOfType: (Character, StatusEffectConstructor<any>) -> {StatusEffect<any>};
    GetAllActiveStatusStatusEffectsOfType: (Character, StatusEffectConstructor<any>) -> {StatusEffect<any>};
    HasStatusEffects: (Character, {StatusEffectConstructor<any>}) -> boolean;
    GetSkillFromString: (Character, string) -> Skill<any, any, any>?;
    GetSkillFromConstructor: (Character, SkillConstructor<any, any, any>) -> Skill<any, any, any>?;
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
    CreateServer: () -> Server;
    CreateClient: () -> Client;
    CreateMoveset: (string) -> Moveset;
    RegisterStatusEffect: (string) -> StatusEffect<any> & StatusEffectConstructor<any>;
    RegisterSkill: (string) -> Skill<any, any, any> & SkillConstructor<any, any, any>;
    Character: CharacterClass;
    Types: {}
}

return nil