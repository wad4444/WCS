type void = nil;

type Callback = () -> void;

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

export type Moveset = {
    Name: string;
    Skills: {never};
}

export type HumanoidPropsMode = "Set" | "Increment"
export type HumanoidDataProps = {
    WalkSpeed: {number | HumanoidPropsMode}?;
    JumpPower: {number | HumanoidPropsMode}?;
    JumpHeight: {number | HumanoidPropsMode}?;
    AutoRotate: {boolean | HumanoidPropsMode}?;
}

export type HumanoidData = {
    Props: HumanoidDataProps;
    Priority: number;
}

export type StatusEffectImpl<Metadata = any, ConstructorArguments... = ()> = {
    new: (any, ConstructorArguments...) -> StatusEffect<Metadata, ConstructorArguments...>,
    Start: (StatusEffect<Metadata, ConstructorArguments...>, number?) -> void;
    End: (StatusEffect<Metadata, ConstructorArguments...>) -> void;
    Pause: (StatusEffect<Metadata, ConstructorArguments...>) -> void;
    Resume: (StatusEffect<Metadata, ConstructorArguments...>) -> void;
    Stop: (StatusEffect<Metadata, ConstructorArguments...>) -> void;
    SetHumanoidData: (StatusEffect<Metadata, ConstructorArguments...>, HumanoidDataProps, number?) -> void;
    ClearHumanoidData: (StatusEffect<Metadata, ConstructorArguments...>) -> void;
    ClearMetadata: (StatusEffect<Metadata, ConstructorArguments...>) -> void;
    SetState: (StatusEffect<Metadata, ConstructorArguments...>, Partial_StatusEffectState) -> void;
    SetMetadata: (StatusEffect<Metadata, ConstructorArguments...>, Metadata) -> void;
    GetState: (StatusEffect<Metadata, ConstructorArguments...>) -> StatusEffectState;
    GetHumanoidData: (StatusEffect<Metadata, ConstructorArguments...>) -> HumanoidData;
    GetMetadata: (StatusEffect<Metadata, ConstructorArguments...>) -> Metadata;
    IsDestroyed: (StatusEffect<Metadata, ConstructorArguments...>) -> boolean;
    GetId: (StatusEffect<Metadata, ConstructorArguments...>) -> string;
    Destroy: (StatusEffect<Metadata, ConstructorArguments...>) -> void;
    Construct: (StatusEffect<Metadata, ConstructorArguments...>) -> void;
    OnStartServer: (StatusEffect<Metadata, ConstructorArguments...>) -> void;
    OnStartClient: (StatusEffect<Metadata, ConstructorArguments...>) -> void;
    OnEndClient: (StatusEffect<Metadata, ConstructorArguments...>) -> void;
    OnEndServer: (StatusEffect<Metadata, ConstructorArguments...>) -> void;
    CreateDamageContainer: (StatusEffect<Metadata, ConstructorArguments...>, number) -> any,
}

type StatusFields<Metadata> = {
    MetadataChanged: ReadonlySignal<(Metadata?, Metadata?) -> void>;
    StateChanged: ReadonlySignal<(StatusEffectState, StatusEffectState) -> void>;
    HumanoidDataChanged: ReadonlySignal<(HumanoidData?, HumanoidData?) -> void>;
    Destroyed: ReadonlySignal<Callback>;
    Started: ReadonlySignal<Callback>;
    Ended: ReadonlySignal<Callback>;
    Character: any;

    DestroyOnEnd: boolean;
}

export type StatusEffect<Metadata = any, ConstructorArguments... = ()> = typeof(setmetatable({} :: StatusFields<Metadata>, {} :: StatusEffectImpl<Metadata, ConstructorArguments...>))

type SkillState = {
    IsActive: boolean,
    Debounce: boolean,
    TimerEndTimestamp: number?,
    StarterParams: any?,
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
    Source: Skill | StatusEffect | void;
}

--[[
        StarterParams = unknown,
    ConstructorArguments extends unknown[] = unknown[],
    Metadata = unknown,
    ServerToClientMessage = unknown,
    ClientToServerMessage = unknown,
]]
type SkillImpl<StarterParams = any, Metadata = any, ClientToServerMessage = any, ServerToClientMessage = any, ConstructorArguments... = ()> = {
    new: (any, ConstructorArguments...) -> Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>,
    ApplyCooldown: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, number) -> void,
    ShouldStart: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> boolean,
    HandleClientMessage: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, ClientToServerMessage) -> void,
    HandleServerMessage: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, ServerToClientMessage) -> void,
    SendMessageToClient: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, ServerToClientMessage) -> void,
    SendMessageToServer: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, ClientToServerMessage) -> void,
    GetName: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> string,
    OnStartServer: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, StarterParams) -> void,
    OnStartClient: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, StarterParams) -> void,
    OnEndServer: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> void,
    OnEndClient: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> void,
    OnConstruct: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, ConstructorArguments...) -> void,
    OnConstructServer: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, ConstructorArguments...) -> void,
    OnConstructClient: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, ConstructorArguments...) -> void,
    GetState: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> SkillState,
    End: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> void,
    CreateDamageContainer: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, number) -> any,
    Destroy: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> void,
}

type SkillFields<StarterParams = any, Metadata = any, ClientToServerMessage = any, ServerToClientMessage = any, ConstructorArguments... = ()> = {
    Janitor: Janitor,
    Started: ReadonlySignal<Callback>,
    Ended: ReadonlySignal<Callback>,
    StateChanged: ReadonlySignal<(NewState: SkillState, OldState: SkillState) -> ()>,
    Destroyed: ReadonlySignal<Callback>,
    MutualExclusives: {SkillImpl<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>},
    Requirements: {SkillImpl<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>},
    Player: Player?,
    Character: any,
    CheckOthersActive: boolean,
}
export type Skill<StarterParams = any, Metadata = any, ClientToServerMessage = any, ServerToClientMessage = any, ConstructorArguments... = ()> = typeof(
    setmetatable(
        {} :: SkillFields<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>,
        {} :: SkillImpl<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>
    )
)

export type AffectableHumanoidProps = {
    WalkSpeed: number;
    JumpPower: number;
    JumpHeight: number;
    AutoRotate: boolean;
}

type HoldableSkillImpl<StarterParams = any, Metadata = any, ClientToServerMessage = any, ServerToClientMessage = any, ConstructorArguments... = ()> = SkillImpl<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...> & {
    SetMaxHoldTime: (HoldableSkill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, number) -> void,
    GetMaxHoldTime: (HoldableSkill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> number,
}
export type HoldableSkill<StarterParams = any, Metadata = any, ClientToServerMessage = any, ServerToClientMessage = any, ConstructorArguments... = ()> = typeof(setmetatable({} :: SkillFields<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, {} :: HoldableSkillImpl<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>))

type CharacterImpl = {
    new: (Instance) -> Character;
    CharacterCreated: ReadonlySignal<(Character) -> void>;
    CharacterDestroyed: ReadonlySignal<(Character) -> void>;
    GetCharacterMap: () -> {[Instance]: Character};
    GetCharacterFromInstance: (Instance) -> Character?;
    SetDefaultProps: (Character, AffectableHumanoidProps) -> void;
    GetDefaultProps: (Character) -> AffectableHumanoidProps;
    GetAllStatusEffects: (Character) -> {StatusEffect};
    GetAllActiveStatusEffects: (Character) -> {StatusEffect};
    GetAllStatusStatusEffectsOfType: (Character, StatusEffectImpl) -> {StatusEffect};
    GetAllActiveStatusStatusEffectsOfType: (Character, StatusEffectImpl) -> {StatusEffect};
    HasStatusEffects: (Character, {StatusEffectImpl}) -> boolean;
    GetSkillFromString: (Character, string) -> Skill?;
    GetSkillFromConstructor: (Character, SkillImpl) -> Skill?;
    ApplyMoveset: (Character, Moveset | string) -> void;
    GetMoveset: (Character) -> string | void;
    ClearMoveset: (Character) -> void;
    ApplySkillsFromMoveset: (Character, Moveset) -> void;
    TakeDamage: (DamageContainer) -> DamageContainer;
    Destroy: (Character) -> void;
    GetId: (Character) -> string;
}

export type Character = typeof(setmetatable({} :: {
    Instance: Instance;
    Humanoid: Humanoid;
    Player: Player?;

    StatusEffectAdded: ReadonlySignal<(StatusEffect) -> void>;
    StatusEffectRemoved: ReadonlySignal<(StatusEffect) -> void>;
    DamageTaken: ReadonlySignal<(number) -> void>;
    Destroyed: ReadonlySignal<Callback>;
    MovesetChanged: ReadonlySignal<(string | void, string | void) -> void>;
}, {} :: CharacterImpl))

export type WCS = {
    CreateServer: () -> Server;
    CreateClient: () -> Client;
    CreateMoveset: (string) -> Moveset;
    RegisterStatusEffect: (string) -> StatusEffectImpl;
    RegisterSkill: (string) -> SkillImpl;
    RegisterHoldableSkill: (string) -> HoldableSkillImpl;
    GetMovesetObjectByName: (string) -> Moveset | void;
    Character: CharacterImpl;
    Types: ModuleScript;
}

local TS = script:FindFirstChild("include") and require(script:WaitForChild("include"):WaitForChild("RuntimeLib") :: ModuleScript) or _G[script]

local exports = {}
for _k, _v in TS.import(script, script, "exports") or {} do
	exports[_k] = _v
end

return exports :: WCS
