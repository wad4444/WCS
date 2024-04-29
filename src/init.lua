type Callback = () -> ()

type RbxScriptConnection = {
	Disconnect: (RbxScriptConnection) -> (),
}

type ReadonlySignal<T = Callback> = {
	Connect: (ReadonlySignal<T>, T) -> RBXScriptConnection,
	Once: (ReadonlySignal<T>, T) -> RBXScriptConnection,
	Wait: (ReadonlySignal<T>) -> (),
}

export type Server = {
	Start: (Server) -> (),
	RegisterDirectory: (Server, Instance) -> (),
	IsActive: () -> boolean,
}

export type Client = {
	Start: (Client) -> (),
	RegisterDirectory: (Client, Instance) -> (),
	IsActive: () -> boolean,
}

export type Moveset = {
	Name: string,
	Skills: { never },
}

export type HumanoidPropsMode = "Set" | "Increment"

export type HumanoidDataProps = {
	WalkSpeed: { number | HumanoidPropsMode }?,
	JumpPower: { number | HumanoidPropsMode }?,
	JumpHeight: { number | HumanoidPropsMode }?,
	AutoRotate: { boolean | HumanoidPropsMode }?,
}

export type HumanoidData = {
	Props: HumanoidDataProps,
	Priority: number,
}

type StatusEffectState = {
	IsActive: boolean,
}

type Partial_StatusEffectState = {
	IsActive: boolean?,
}

type StatusFields<Metadata> = {
	ConstructorArguments: { any },
	MetadataChanged: ReadonlySignal<(Metadata?, Metadata?) -> ()>,
	StateChanged: ReadonlySignal<(StatusEffectState, StatusEffectState) -> ()>,
	HumanoidDataChanged: ReadonlySignal<(HumanoidData?, HumanoidData?) -> ()>,
	Destroyed: ReadonlySignal<Callback>,
	Started: ReadonlySignal<Callback>,
	Ended: ReadonlySignal<Callback>,
	Character: Character,

	DestroyOnEnd: boolean,
}

type StatusEffectImpl<Metadata = any, ConstructorArguments... = ()> = {
	new: (Character, ConstructorArguments...) -> StatusEffect<Metadata, ConstructorArguments...>,
	Start: (StatusEffect<Metadata, ConstructorArguments...>, number?) -> (),
	End: (StatusEffect<Metadata, ConstructorArguments...>) -> (),
	Pause: (StatusEffect<Metadata, ConstructorArguments...>) -> (),
	Resume: (StatusEffect<Metadata, ConstructorArguments...>) -> (),
	Stop: (StatusEffect<Metadata, ConstructorArguments...>) -> (),
	SetHumanoidData: (StatusEffect<Metadata, ConstructorArguments...>, HumanoidDataProps, number?) -> (),
	ClearHumanoidData: (StatusEffect<Metadata, ConstructorArguments...>) -> (),
	ClearMetadata: (StatusEffect<Metadata, ConstructorArguments...>) -> (),
	SetState: (StatusEffect<Metadata, ConstructorArguments...>, Partial_StatusEffectState) -> (),
	SetMetadata: (StatusEffect<Metadata, ConstructorArguments...>, Metadata) -> (),
	GetState: (StatusEffect<Metadata, ConstructorArguments...>) -> StatusEffectState,
	GetHumanoidData: (StatusEffect<Metadata, ConstructorArguments...>) -> HumanoidData,
	GetMetadata: (StatusEffect<Metadata, ConstructorArguments...>) -> Metadata,
	IsDestroyed: (StatusEffect<Metadata, ConstructorArguments...>) -> boolean,
	GetId: (StatusEffect<Metadata, ConstructorArguments...>) -> string,
	Destroy: (StatusEffect<Metadata, ConstructorArguments...>) -> (),
	Construct: (StatusEffect<Metadata, ConstructorArguments...>) -> (),
	OnStartServer: (StatusEffect<Metadata, ConstructorArguments...>) -> (),
	OnStartClient: (StatusEffect<Metadata, ConstructorArguments...>) -> (),
	OnEndClient: (StatusEffect<Metadata, ConstructorArguments...>) -> (),
	OnEndServer: (StatusEffect<Metadata, ConstructorArguments...>) -> (),
	CreateDamageContainer: (StatusEffect<Metadata, ConstructorArguments...>, number) -> DamageContainer,
}

export type StatusEffect<Metadata = any, ConstructorArguments... = ()> = typeof(setmetatable(
	{} :: StatusFields<Metadata> & StatusEffectImpl<Metadata, ConstructorArguments...>,
	{}
))

type AnyStatusImpl = {
	new: (Character) -> AnyStatus,
	Start: (AnyStatus, number?) -> (),
	End: (AnyStatus) -> (),
	Pause: (AnyStatus) -> (),
	Resume: (AnyStatus) -> (),
	Stop: (AnyStatus) -> (),
	SetHumanoidData: (AnyStatus, HumanoidDataProps, number?) -> (),
	ClearHumanoidData: (AnyStatus) -> (),
	ClearMetadata: (AnyStatus) -> (),
	SetState: (AnyStatus, Partial_StatusEffectState) -> (),
	SetMetadata: (AnyStatus, any) -> (),
	GetState: (AnyStatus) -> StatusEffectState,
	GetHumanoidData: (AnyStatus) -> HumanoidData,
	GetMetadata: (AnyStatus) -> any,
	IsDestroyed: (AnyStatus) -> boolean,
	GetId: (AnyStatus) -> string,
	Destroy: (AnyStatus) -> (),
	Construct: (AnyStatus) -> (),
	OnStartServer: (AnyStatus) -> (),
	OnStartClient: (AnyStatus) -> (),
	OnEndClient: (AnyStatus) -> (),
	OnEndServer: (AnyStatus) -> (),
	CreateDamageContainer: (AnyStatus, number) -> any,
}

export type AnyStatus = typeof(setmetatable(
	{} :: {
		ConstructorArguments: { any },
		MetadataChanged: ReadonlySignal<(any?, any?) -> ()>,
		StateChanged: ReadonlySignal<(StatusEffectState, StatusEffectState) -> ()>,
		HumanoidDataChanged: ReadonlySignal<(HumanoidData?, HumanoidData?) -> ()>,
		Destroyed: ReadonlySignal<Callback>,
		Started: ReadonlySignal<Callback>,
		Ended: ReadonlySignal<Callback>,
		Character: Character,

		DestroyOnEnd: boolean,
	} & AnyStatusImpl,
	{}
))

type SkillState = {
	IsActive: boolean,
	Debounce: boolean,
	TimerEndTimestamp: number?,
	StarterParams: any?,
}

type SkillData = {
	state: SkillState,
}

type SkillType = "Default" | "Holdable"

type SkillTypeEnum = {
	Default: number,
	Holdable: number,
}

type BooleanOrString = boolean | string

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
	GetAll: (self: Janitor) -> { [any]: any },

	Cleanup: (self: Janitor) -> (),
	Destroy: (self: Janitor) -> (),

	LinkToInstance: (self: Janitor, Object: Instance, AllowMultiple: boolean?) -> RBXScriptConnection,
	LegacyLinkToInstance: (self: Janitor, Object: Instance, AllowMultiple: boolean?) -> RbxScriptConnection,

	LinkToInstances: (self: Janitor, ...Instance) -> Janitor,
}

export type DamageContainer = {
	Damage: number,
	Source: AnySkill | AnyStatus | nil,
}

type SkillImpl<StarterParams = any, Metadata = any, ClientToServerMessage = any, ServerToClientMessage = any, ConstructorArguments... = ()> = {
	new: (any, ConstructorArguments...) -> Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>,
	ApplyCooldown: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, number) -> (),
	ShouldStart: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> boolean,
	HandleClientMessage: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, ClientToServerMessage) -> (),
	HandleServerMessage: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, ServerToClientMessage) -> (),
	SendMessageToClient: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, ServerToClientMessage) -> (),
	SendMessageToServer: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, ClientToServerMessage) -> (),
	GetName: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> string,
	OnStartServer: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, StarterParams) -> (),
	OnStartClient: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, StarterParams) -> (),
	OnEndServer: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> (),
	OnEndClient: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> (),
	OnConstruct: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, ConstructorArguments...) -> (),
	OnConstructServer: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, ConstructorArguments...) -> (),
	OnConstructClient: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, ConstructorArguments...) -> (),
	GetState: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> SkillState,
	ClearMetadata: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> (),
	SetMetadata: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, Metadata) -> (),
	GetSkillType: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> SkillType,
	End: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> (),
	CreateDamageContainer: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, number) -> any,
	Destroy: (Skill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> (),
}

type AnySkillImpl = {
	new: (Character) -> AnySkill,
	ApplyCooldown: (AnySkill, number) -> (),
	ShouldStart: (AnySkill) -> boolean,
	HandleClientMessage: (AnySkill, any) -> (),
	HandleServerMessage: (AnySkill, any) -> (),
	SendMessageToClient: (AnySkill, any) -> (),
	SendMessageToServer: (AnySkill, any) -> (),
	GetName: (AnySkill) -> string,
	OnStartServer: (AnySkill, any) -> (),
	OnStartClient: (AnySkill, any) -> (),
	OnEndServer: (AnySkill) -> (),
	OnEndClient: (AnySkill) -> (),
	OnConstruct: (AnySkill) -> (),
	OnConstructServer: (AnySkill) -> (),
	OnConstructClient: (AnySkill) -> (),
	GetState: (AnySkill) -> SkillState,
	ClearMetadata: (AnySkill) -> (),
	SetMetadata: (AnySkill, any) -> (),
	GetSkillType: (AnySkill) -> SkillType,
	End: (AnySkill) -> (),
	CreateDamageContainer: (AnySkill, number) -> DamageContainer,
	Destroy: (AnySkill) -> (),
}

type Array<T> = { T }

type SkillFields<StarterParams = any, Metadata = any, ClientToServerMessage = any, ServerToClientMessage = any, ConstructorArguments... = ()> = {
	ConstructorArguments: { any },
	Janitor: Janitor,
	Started: ReadonlySignal<Callback>,
	Ended: ReadonlySignal<Callback>,
	StateChanged: ReadonlySignal<(NewState: SkillState, OldState: SkillState) -> ()>,
	Destroyed: ReadonlySignal<Callback>,
	MetadataChanged: ReadonlySignal<(New: Metadata?, Old: Metadata?) -> ()>,
	MutualExclusives: { SkillImpl<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...> },
	Requirements: { SkillImpl<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...> },
	CheckClientState: boolean,
	Player: Player?,
	Character: Character,
	CheckOthersActive: boolean,
}

export type Skill<StarterParams = any, Metadata = any, ClientToServerMessage = any, ServerToClientMessage = any, ConstructorArguments... = ()> =
	typeof(setmetatable(
		{} :: SkillFields<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...> & SkillImpl<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>,
		{}
	))

export type AnySkill = typeof(setmetatable(
	{} :: {
		Janitor: Janitor,
		Started: ReadonlySignal<Callback>,
		Ended: ReadonlySignal<Callback>,
		StateChanged: ReadonlySignal<(NewState: SkillState, OldState: SkillState) -> ()>,
		Destroyed: ReadonlySignal<Callback>,
		MutualExclusives: { AnySkill },
		Requirements: { AnySkill },
		CheckClientState: boolean,
		Player: Player?,
		Character: Character,
		CheckOthersActive: boolean,
	} & AnySkillImpl,
	{}
))

export type AffectableHumanoidProps = {
	WalkSpeed: number,
	JumpPower: number,
	JumpHeight: number,
	AutoRotate: boolean,
}

type HoldableSkillImpl<StarterParams = any, Metadata = any, ClientToServerMessage = any, ServerToClientMessage = any, ConstructorArguments... = ()> = SkillImpl<
	StarterParams,
	Metadata,
	ClientToServerMessage,
	ServerToClientMessage,
	ConstructorArguments...
> & {
	SetMaxHoldTime: (HoldableSkill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>, number) -> (),
	GetMaxHoldTime: (HoldableSkill<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>) -> number,
}

export type HoldableSkill<StarterParams = any, Metadata = any, ClientToServerMessage = any, ServerToClientMessage = any, ConstructorArguments... = ()> =
	typeof(setmetatable(
		{} :: SkillFields<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>,
		{} :: HoldableSkillImpl<StarterParams, Metadata, ClientToServerMessage, ServerToClientMessage, ConstructorArguments...>
	))

type AnyHoldableSkillImpl = AnySkillImpl & {
	SetMaxHoldTime: (AnyHoldableSkill, number) -> (),
	GetMaxHoldTime: (AnyHoldableSkill) -> number,
}

export type AnyHoldableSkill = typeof(setmetatable(
	{} :: {
		Janitor: Janitor,
		Started: ReadonlySignal<Callback>,
		Ended: ReadonlySignal<Callback>,
		StateChanged: ReadonlySignal<(NewState: SkillState, OldState: SkillState) -> ()>,
		Destroyed: ReadonlySignal<Callback>,
		MutualExclusives: { AnySkill },
		Requirements: { AnySkill },
		Player: Player?,
		Character: Character,
		CheckOthersActive: boolean,
	} & AnyHoldableSkillImpl,
	{}
))

type CharacterImpl = {
	new: (Instance) -> Character,
	CharacterCreated: ReadonlySignal<(Character) -> ()>,
	CharacterDestroyed: ReadonlySignal<(Character) -> ()>,
	GetCharacterMap: () -> { [Instance]: Character },
	GetCharacterFromInstance: (Instance) -> Character?,
	SetDefaultProps: (Character, AffectableHumanoidProps) -> (),
	GetDefaultProps: (Character) -> AffectableHumanoidProps,
	GetAllStatusEffects: (Character) -> { AnyStatus },
	GetAllActiveStatusEffects: (Character) -> { AnyStatus },
	GetAllStatusStatusEffectsOfType: (Character, AnyStatusImpl) -> { AnyStatus },
	GetAllActiveStatusStatusEffectsOfType: (Character, AnyStatusImpl) -> { AnyStatus },
	HasStatusEffects: (Character, { AnyStatusImpl }) -> boolean,
	GetSkillFromString: (Character, string) -> AnySkill?,
	GetSkillFromConstructor: (Character, AnySkillImpl) -> AnySkill?,
	ApplyMoveset: (Character, Moveset | string) -> (),
	GetMoveset: (Character) -> string | nil,
	ClearMoveset: (Character) -> (),
	ApplySkillsFromMoveset: (Character, Moveset) -> (),
	TakeDamage: (Character, DamageContainer) -> DamageContainer,
	PredictDamage: (Character, DamageContainer) -> DamageContainer,
	Destroy: (Character) -> (),
	GetId: (Character) -> string,
}

export type Character = typeof(setmetatable(
	{} :: {
		Instance: Instance,
		Humanoid: Humanoid,
		Player: Player?,

		SkillAdded: ReadonlySignal<(AnySkill) -> ()>,
		SkillRemoved: ReadonlySignal<(AnyStatus) -> ()>,
		StatusEffectAdded: ReadonlySignal<(AnyStatus) -> ()>,
		StatusEffectRemoved: ReadonlySignal<(AnyStatus) -> ()>,
		DamageDealt: ReadonlySignal<(Character?, DamageContainer) -> ()>,
		DamageTaken: ReadonlySignal<(number) -> ()>,
		Destroyed: ReadonlySignal<Callback>,
		MovesetChanged: ReadonlySignal<(string | nil, string | nil) -> ()>,
	} & CharacterImpl,
	{}
))

export type WCS = {
	CreateServer: () -> Server,
	CreateClient: () -> Client,
	CreateMoveset: (string) -> Moveset,
	RegisterStatusEffect: (string) -> StatusEffectImpl,
	RegisterSkill: (string) -> SkillImpl,
	RegisterHoldableSkill: (string) -> HoldableSkillImpl,
	GetMovesetObjectByName: (string) -> Moveset | nil,
	Character: CharacterImpl,
	SkillType: SkillTypeEnum,
	Types: ModuleScript,
}

local TS = script:FindFirstChild("include") and require(script:WaitForChild("include"):WaitForChild("RuntimeLib") :: ModuleScript) or _G[script]

local exports = {}
for _k, _v in TS.import(script, script, "exports") or {} do
	exports[_k] = _v
end

table.freeze(exports)

return exports :: WCS
