type Connection = {
	Disconnect: (self: Connection) -> (),
	Destroy: (self: Connection) -> (),
	Connected: boolean,
}

type Signal<T...> = {
	Fire: (self: Signal<T...>, T...) -> (),
	FireDeferred: (self: Signal<T...>, T...) -> (),
	Connect: (self: Signal<T...>, fn: (T...) -> ()) -> Connection,
	Once: (self: Signal<T...>, fn: (T...) -> ()) -> Connection,
	DisconnectAll: (self: Signal<T...>) -> (),
	GetConnections: (self: Signal<T...>) -> { Connection },
	Destroy: (self: Signal<T...>) -> (),
	Wait: (self: Signal<T...>) -> T...,
}

type BooleanOrString = boolean | string

type Janitor = typeof(setmetatable(
	{} :: {
		ClassName: "Janitor",
		CurrentlyCleaning: boolean,
		SuppressInstanceReDestroy: boolean,

		Add: <T>(self: Janitor, Object: T, MethodName: BooleanOrString?, Index: any?) -> T,
		AddObject: <T, A...>(
			self: Janitor,
			Constructor: { new: (A...) -> T },
			MethodName: BooleanOrString?,
			Index: any?,
			A...
		) -> T,
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
		LinkToInstances: (self: Janitor, ...Instance) -> Janitor,
	},
	{} :: { __call: (self: Janitor) -> () }
))

type Callback = () -> ()
type Validator = (data: any) -> boolean

export type Moveset = {
	Name: string,
	Skills: { AnySkillImpl },
}

export type SkillType = {
	Default: number,
	Holdable: number,
}

export type StringSkillType = "Default" | "Holdable"

export type DamageContainer = {
	Damage: number,
	Source: AnySkill | AnyStatusEffect | nil,
}

export type AffectableHumanoidProps = {
	WalkSpeed: number,
	JumpPower: number,
	JumpHeight: number,
	AutoRotate: boolean,
}

export type WCS = {
	GetMovesetObjectByName: (string) -> Moveset?,

	CreateServer: () -> Server,
	CreateClient: () -> Client,
	CreateMoveset: (string, { AnySkillImpl }, { [AnySkillImpl]: { any } }?) -> Moveset,

	RegisterSkill: (string, AnySkillImpl?) -> AnySkillImpl,
	RegisterHoldableSkill: (string, AnySkillImpl?) -> HoldableSkillImpl,
	DefineMessage: ((...any) -> any, MessageConfig) -> (),

	RegisterStatusEffect: (string, AnyStatusImpl?) -> AnyStatusImpl,

	Character: CharacterImpl,
	SkillType: SkillType,
}

export type Server = {
	RegisterDirectory: (Server, Instance) -> (),
	Start: (Server) -> (),
	IsActive: (Server) -> boolean,
}

export type Client = {
	RegisterDirectory: (Client, Instance) -> (),
	Start: (Client) -> (),
	IsActive: (Client) -> boolean,
}

export type CharacterImpl = {
	__index: CharacterImpl,
	new: (Instance) -> Character,

	CharacterCreated: Signal<Character>,
	CharacterDestroyed: Signal<Character>,

	GetCharacterMap: () -> { [Instance]: Character },
	GetCharacterFromInstance: (Instance) -> Character?,
	GetLocalCharacter: () -> Character?,

	GetDefaultProps: (Character) -> AffectableHumanoidProps,
	GetAppliedProps: (Character) -> AffectableHumanoidProps,

	GetAllStatusEffects: (Character) -> { AnyStatusEffect },
	GetAllActiveStatusEffects: (Character) -> { AnyStatusEffect },
	GetAllStatusEffectsOfType: (Character, AnyStatusImpl) -> { AnyStatusEffect },
	GetAllActiveStatusEffectsOfType: (Character, AnyStatusImpl) -> { AnyStatusEffect },

	HasStatusEffects: (Character, { AnyStatusImpl }) -> boolean,

	GetSkills: (Character) -> { AnySkill },
	GetAllActiveSkills: (Character) -> { AnySkill },

	GetSkillFromString: (Character, string) -> AnySkill?,
	GetSkillFromConstructor: (Character, AnySkillImpl) -> AnySkill?,

	GetMoveset: (Character) -> Moveset?,
	GetMovesetName: (Character) -> string?,
	GetMovesetSkills: (Character, Moveset?) -> { AnySkill },

	SetDefaultProps: (Character, AffectableHumanoidProps) -> (),

	ApplyMoveset: (Character, Moveset | string) -> (),
	ApplySkillsFromMoveset: (Character, Moveset) -> (),
	ClearMoveset: (Character) -> (),

	TakeDamage: (Character, DamageContainer) -> DamageContainer,
	PredictDamage: (Character, DamageContainer) -> DamageContainer,

	Destroy: (Character) -> (),
}

type CharacterFields = {
	Instance: Instance,
	Humanoid: Humanoid,
	Player: Player?,

	DisableSkills: boolean,

	SkillAdded: Signal<AnySkill>,
	SkillRemoved: Signal<AnyStatusEffect>,

	SkillStarted: Signal<AnySkill>,
	SkillEnded: Signal<AnySkill>,

	StatusEffectAdded: Signal<AnyStatusEffect>,
	StatusEffectRemoved: Signal<AnyStatusEffect>,

	StatusEffectStarted: Signal<AnySkill>,
	StatusEffectEnded: Signal<AnySkill>,

	DamageDealt: Signal<Character?, DamageContainer>,
	DamageTaken: Signal<number>,

	HumanoidPropertiesUpdated: Signal<AffectableHumanoidProps>,
	MovesetChanged: Signal<string?, string?>,
	Destroyed: Signal<Callback>,
}

export type Character = typeof(setmetatable({} :: CharacterFields, {} :: CharacterImpl))

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

type PartialStatusEffectState = {
	IsActive: boolean?,
}

export type StatusImpl<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...> = {
	__index: StatusImpl<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>,
	new: (Character, StarterParams...) -> StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>,

	IsDestroyed: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> boolean,
	GetState: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> StatusEffectState,
	GetHumanoidData: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> HumanoidData,
	GetMetadata: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> Metadata,
	GetDebounceEndTimestamp: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> number,
	GetModificationPriority: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> number,

	Start: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>, number?) -> (),
	Pause: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> (),
	Resume: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> (),
	Stop: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> (),
	End: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> (),
	Destroy: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> (),

	CreateDamageContainer: (
		StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>,
		number
	) -> DamageContainer,
	SetState: (
		StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>,
		PartialStatusEffectState
	) -> (),
	SetHumanoidData: (
		StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>,
		HumanoidDataProps,
		number?
	) -> (),
	SetMetadata: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>, Metadata) -> (),

	ClearHumanoidData: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> (),
	ClearMetadata: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> (),

	OnConstruct: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>, ConstructorParams...) -> (),
	OnConstructClient: (
		StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>,
		ConstructorParams...
	) -> (),
	OnConstructServer: (
		StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>,
		ConstructorParams...
	) -> (),
	OnStartServer: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> (),
	OnStartClient: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> (),
	OnEndClient: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> (),
	OnEndServer: (StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>) -> (),
}

export type AnyStatusImpl = {
	[any]: any,
	__index: AnyStatusImpl,
	new: (Character, ...any) -> AnyStatusEffect,

	IsDestroyed: (AnyStatusEffect) -> boolean,
	GetState: (AnyStatusEffect) -> StatusEffectState,
	GetHumanoidData: (AnyStatusEffect) -> HumanoidData,
	GetMetadata: (AnyStatusEffect) -> any,
	GetDebounceEndTimestamp: (AnyStatusEffect) -> number,
	GetModificationPriority: (AnyStatusEffect) -> number,

	Start: (AnyStatusEffect, number?) -> (),
	Pause: (AnyStatusEffect) -> (),
	Resume: (AnyStatusEffect) -> (),
	Stop: (AnyStatusEffect) -> (),
	End: (AnyStatusEffect) -> (),
	Destroy: (AnyStatusEffect) -> (),

	CreateDamageContainer: (AnyStatusEffect, number) -> DamageContainer,
	SetState: (AnyStatusEffect, PartialStatusEffectState) -> (),
	SetHumanoidData: (AnyStatusEffect, HumanoidDataProps, number?) -> (),
	SetMetadata: (AnyStatusEffect, any) -> (),

	ClearHumanoidData: (AnyStatusEffect) -> (),
	ClearMetadata: (AnyStatusEffect) -> (),

	OnConstruct: (AnyStatusEffect, ...any) -> (),
	OnConstructClient: (AnyStatusEffect, ...any) -> (),
	OnConstructServer: (AnyStatusEffect, ...any) -> (),
	OnStartServer: (AnyStatusEffect) -> (),
	OnStartClient: (AnyStatusEffect) -> (),
	OnEndClient: (AnyStatusEffect) -> (),
	OnEndServer: (AnyStatusEffect) -> (),
}

type BaseStatusFields = {
	ConstructorArguments: { any },
	DamageModificationPriority: number,
	DestroyOnEnd: boolean,

	StateChanged: Signal<StatusEffectState, StatusEffectState>,
	HumanoidDataChanged: Signal<HumanoidData?, HumanoidData?>,

	Started: Signal<Callback>,
	Ended: Signal<Callback>,
	Destroyed: Signal<Callback>,

	Player: Player?,
	Character: Character,

	Janitor: Janitor,
}

type StatusFields<Metadata, Name> = BaseStatusFields & {
	Name: Name,
	MetadataChanged: Signal<Metadata?, Metadata?>,
}

type AnyStatusFields = BaseStatusFields & {
	[any]: any,
	Name: string,
	MetadataChanged: Signal<any?, any?>,
}

export type StatusEffect<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...> =
	typeof(setmetatable(
		{} :: StatusFields<Metadata, Name>,
		{} :: StatusImpl<Impl, Fields, Metadata, Name, ConstructorParams..., StarterParams...>
	))
	& typeof(setmetatable({}, ({} :: any) :: Impl))
	& Fields

export type AnyStatusEffect = typeof(setmetatable({} :: AnyStatusFields, {} :: AnyStatusImpl))

type SkillState = {
	IsActive: boolean,
	Debounce: boolean,
	TimerEndTimestamp: number?,
	StarterParams: any?,
}

type MessageConfig = {
	Destination: "Client" | "Server",
	Type: "Event" | "Request",
	Unreliable: boolean,
	Validators: { Validator }?,
	ValueValidator: Validator?,
}

export type SkillImpl<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...> = {
	__index: SkillImpl<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>,
	new: (Character, ConstructorParams...) -> Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>,

	IsDestroyed: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>) -> boolean,
	GetState: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>) -> StatusEffectState,
	GetMetadata: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>) -> Metadata,
	GetDebounceEndTimestamp: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>) -> number,
	GetName: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>) -> Name,
	GetSkillType: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>) -> Type,

	Start: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>, StarterParams...) -> (),
	Stop: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>) -> (),
	End: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>) -> (),
	Destroy: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>) -> (),

	SetMetadata: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>, Metadata) -> (),
	CreateDamageContainer: (
		Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>,
		number
	) -> DamageContainer,
	ApplyCooldown: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>, number) -> (),
	ClearMetadata: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>) -> (),

	ShouldStart: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>) -> boolean,
	AssumeStart: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>, StarterParams...) -> (),
	OnStartServer: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>, StarterParams...) -> (),
	OnStartClient: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>, StarterParams...) -> (),
	OnEndServer: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>) -> (),
	OnEndClient: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>) -> (),
	OnConstruct: (Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>, ConstructorParams...) -> (),
	OnConstructServer: (
		Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>,
		ConstructorParams...
	) -> (),
	OnConstructClient: (
		Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>,
		ConstructorParams...
	) -> (),
}

export type AnySkillImpl = {
	[any]: any,
	__index: AnySkillImpl,
	new: (Character, ...any) -> AnySkill,

	IsDestroyed: (AnySkill) -> boolean,
	GetState: (AnySkill) -> StatusEffectState,
	GetMetadata: (AnySkill) -> any,
	GetDebounceEndTimestamp: (AnySkill) -> number,
	GetName: (AnySkill) -> string,
	GetSkillType: (AnySkill) -> StringSkillType,

	Start: (AnySkill, ...any) -> (),
	Stop: (AnySkill) -> (),
	End: (AnySkill) -> (),
	Destroy: (AnySkill) -> (),

	SetMetadata: (AnySkill, string) -> (),
	CreateDamageContainer: (AnySkill, number) -> DamageContainer,
	ApplyCooldown: (AnySkill, number) -> (),
	ClearMetadata: (AnySkill) -> (),

	ShouldStart: (AnySkill) -> boolean,
	AssumeStart: (AnySkill, ...any) -> (),
	OnStartServer: (AnySkill, ...any) -> (),
	OnStartClient: (AnySkill, ...any) -> (),
	OnEndServer: (AnySkill) -> (),
	OnEndClient: (AnySkill) -> (),
	OnConstruct: (AnySkill, ...any) -> (),
	OnConstructServer: (AnySkill, ...any) -> (),
	OnConstructClient: (AnySkill, ...any) -> (),
}

type BaseSkillFields = {
	ParamValidators: { Validator },

	MutualExclusives: { AnySkill },
	Requirements: { AnySkill },

	CheckClientState: boolean,
	CheckOthersActive: boolean,
	CheckedByOthers: boolean,

	Player: Player?,
	Character: Character,

	Started: Signal<Callback>,
	Ended: Signal<Callback>,
	Destroyed: Signal<Callback>,

	StateChanged: Signal<SkillState, SkillState>,
	MetadataChanged: Signal<any, any>,

	Janitor: Janitor,
}

type SkillFields<Metadata, Name> = BaseSkillFields & {
	Name: Name,
	MetadataChanged: Signal<Metadata?, Metadata?>,
}

type AnySkillFields = BaseSkillFields & {
	[any]: any,
	Name: string,
	MetadataChanged: Signal<any?, any?>,
}

export type Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...> =
	typeof(setmetatable(
		{} :: SkillFields<Metadata, Name>,
		{} :: SkillImpl<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>
	))
	& typeof(setmetatable({}, ({} :: any) :: Impl))
	& Fields

export type AnySkill = typeof(setmetatable({} :: AnySkillFields, {} :: AnySkillImpl))

export type HoldableSkillImpl = {
	__index: HoldableSkillImpl,
	SetMaxHoldTime: (HoldableSkillImpl, number) -> (),
	GetMaxHoldTime: (HoldableSkillImpl) -> number,
}

export type AnyHoldableSkillImpl = {
	[any]: any,
	__index: AnyHoldableSkillImpl,
	SetMaxHoldTime: (AnyHoldableSkillImpl, number) -> (),
	GetMaxHoldTime: (AnyHoldableSkillImpl) -> number,
}

export type HoldableSkill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...> =
	Skill<Impl, Fields, Metadata, Name, Type, ConstructorParams..., StarterParams...>
	& typeof(setmetatable({}, {} :: HoldableSkillImpl))

export type AnyHoldableSkill = typeof(setmetatable({} :: AnySkillFields, {} :: AnyHoldableSkillImpl))

local TS = script:FindFirstChild("include")
		and (require)(script:WaitForChild("include"):WaitForChild("RuntimeLib") :: ModuleScript)
	or _G[script]

local exports = {}
for _k, _v in TS.import(script, script, "exports") or {} do
	exports[_k] = _v
end

table.freeze(exports)

return exports :: WCS
