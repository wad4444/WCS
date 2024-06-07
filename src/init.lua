type Callback = () -> ()

export type Server = {
	Start: (Server) -> (),
	RegisterDirectory: (Server, Instance) -> (),
	IsActive: (Server) -> boolean,
}

export type Client = {
	Start: (Client) -> (),
	RegisterDirectory: (Client, Instance) -> (),
	IsActive: (Client) -> boolean,
}

export type ReadonlySignal<T = Callback> = {
	Connect: (ReadonlySignal<T>, T) -> RBXScriptConnection,
	Once: (ReadonlySignal<T>, T) -> RBXScriptConnection,
	Wait: (ReadonlySignal<T>) -> (),
}

type StatusEffectState = {
	IsActive: boolean,
}
type Partial_StatusEffectState = {
	IsActive: boolean?,
}

export type Moveset = {
	Name: string,
	Skills: { SkillImpl },
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

export type StatusEffectImpl = {
	__index: StatusEffectImpl,
	[any]: any,
	new: (Character) -> StatusEffect,
	Start: (StatusEffect, number?) -> (),
	Pause: (StatusEffect) -> (),
	Resume: (StatusEffect) -> (),
	Stop: (StatusEffect) -> (),
	End: (StatusEffect) -> (),
	SetHumanoidData: (StatusEffect, HumanoidDataProps, number?) -> (),
	ClearHumanoidData: (StatusEffect) -> (),
	ClearMetadata: (StatusEffect) -> (),
	SetState: (StatusEffect, Partial_StatusEffectState) -> (),
	SetMetadata: (StatusEffect, any) -> (),
	GetState: (StatusEffect) -> StatusEffectState,
	GetHumanoidData: (StatusEffect) -> HumanoidData,
	GetMetadata: (StatusEffect) -> any,
	IsDestroyed: (StatusEffect) -> boolean,
	Destroy: (StatusEffect) -> (),
	Construct: (StatusEffect) -> (),
	OnStartServer: (StatusEffect) -> (),
	OnStartClient: (StatusEffect) -> (),
	OnEndClient: (StatusEffect) -> (),
	OnEndServer: (StatusEffect) -> (),
	CreateDamageContainer: (StatusEffect, number) -> DamageContainer,
	GetModificationPriority: (StatusEffect) -> number,
}

type StatusFields = {
	[any]: any,
	ConstructorArguments: { any },
	MetadataChanged: ReadonlySignal<(any?, any?) -> ()>,
	StateChanged: ReadonlySignal<(StatusEffectState, StatusEffectState) -> ()>,
	HumanoidDataChanged: ReadonlySignal<(HumanoidData?, HumanoidData?) -> ()>,
	Destroyed: ReadonlySignal<Callback>,
	Started: ReadonlySignal<Callback>,
	Ended: ReadonlySignal<Callback>,
	Character: Character,
	DamageModificationPriority: number,

	DestroyOnEnd: boolean,
}

export type StatusEffect = typeof(setmetatable({} :: StatusFields, {} :: StatusEffectImpl))

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
	Disconnect: (RbxScriptConnection) -> (),
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
	Source: Skill | StatusEffect | nil,
}

type SkillImpl = {
	__index: SkillImpl,
	[any]: any,
	new: (Character) -> Skill,
	ApplyCooldown: (Skill, number) -> (),
	ShouldStart: (Skill) -> boolean,
	GetName: (Skill) -> string,
	OnStartServer: (Skill, any) -> (),
	OnStartClient: (Skill, any) -> (),
	OnEndServer: (Skill) -> (),
	OnEndClient: (Skill) -> (),
	OnConstruct: (Skill) -> (),
	OnConstructServer: (Skill) -> (),
	OnConstructClient: (Skill) -> (),
	GetState: (Skill) -> SkillState,
	ClearMetadata: (Skill) -> (),
	SetMetadata: (Skill, any) -> (),
	GetSkillType: (Skill) -> SkillType,
	Stop: (Skill) -> (),
	End: (Skill) -> (),
	CreateDamageContainer: (Skill, number) -> DamageContainer,
	Destroy: (Skill) -> (),
}
type Array<T> = { T }

type SkillFields = {
	[any]: any,
	Janitor: Janitor,
	Started: ReadonlySignal<Callback>,
	Ended: ReadonlySignal<Callback>,
	StateChanged: ReadonlySignal<(NewState: SkillState, OldState: SkillState) -> ()>,
	Destroyed: ReadonlySignal<Callback>,
	MutualExclusives: { Skill },
	Requirements: { Skill },
	CheckClientState: boolean,
	Player: Player?,
	Character: Character,
	CheckOthersActive: boolean,
	CheckedByOthers: boolean,
}

export type Skill = typeof(setmetatable({} :: SkillFields, {} :: SkillImpl))

export type AffectableHumanoidProps = {
	WalkSpeed: number,
	JumpPower: number,
	JumpHeight: number,
	AutoRotate: boolean,
}

type HoldableSkillImpl = SkillImpl & {
	__index: HoldableSkillImpl,
	SetMaxHoldTime: (HoldableSkillImpl, number) -> (),
	GetMaxHoldTime: (HoldableSkillImpl) -> number,
}
export type HoldableSkill = typeof(setmetatable({} :: SkillFields, {} :: HoldableSkillImpl))

type AnyHoldableSkillImpl = SkillImpl & {
	__index: AnyHoldableSkillImpl,
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
		MutualExclusives: { Skill },
		Requirements: { Skill },
		Player: Player?,
		Character: Character,
		CheckOthersActive: boolean,
		CheckedByOthers: boolean,
	},
	{} :: AnyHoldableSkillImpl
))

type CharacterImpl = {
	__index: CharacterImpl,
	new: (Instance) -> Character,
	CharacterCreated: ReadonlySignal<(Character) -> ()>,
	CharacterDestroyed: ReadonlySignal<(Character) -> ()>,
	GetCharacterMap: () -> { [Instance]: Character },
	GetCharacterFromInstance: (Instance) -> Character?,
	SetDefaultProps: (Character, AffectableHumanoidProps) -> (),
	GetDefaultProps: (Character) -> AffectableHumanoidProps,
	GetAllStatusEffects: (Character) -> { StatusEffect },
	GetAllActiveStatusEffects: (Character) -> { StatusEffect },
	GetAllStatusEffectsOfType: (Character, StatusEffectImpl) -> { StatusEffect },
	GetAllActiveStatusEffectsOfType: (Character, StatusEffectImpl) -> { StatusEffect },
	HasStatusEffects: (Character, { StatusEffectImpl }) -> boolean,
	GetSkillFromString: (Character, string) -> Skill?,
	GetSkills: (Character) -> { Skill },
	GetSkillFromConstructor: (Character, SkillImpl) -> Skill?,
	ApplyMoveset: (Character, Moveset | string) -> (),
	GetMoveset: (Character) -> string?,
	ClearMoveset: (Character) -> (),
	ApplySkillsFromMoveset: (Character, Moveset) -> (),
	TakeDamage: (Character, DamageContainer) -> DamageContainer,
	PredictDamage: (Character, DamageContainer) -> DamageContainer,
	Destroy: (Character) -> (),
	GetId: (Character) -> string,
}

type CharacterFields = {
	DisableSkills: boolean,
	Instance: Instance,
	Humanoid: Humanoid,
	Player: Player?,
	SkillAdded: ReadonlySignal<(Skill) -> ()>,
	SkillRemoved: ReadonlySignal<(StatusEffect) -> ()>,
	StatusEffectAdded: ReadonlySignal<(StatusEffect) -> ()>,
	StatusEffectRemoved: ReadonlySignal<(StatusEffect) -> ()>,
    SkillStarted: ReadonlySignal<(Skill) -> ()>,
    SkillEnded: ReadonlySignal<(Skill) -> ()>,
    StatusEffectStarted: ReadonlySignal<(Skill) -> ()>,
    StatusEffectEnded: ReadonlySignal<(Skill) -> ()>,
	DamageDealt: ReadonlySignal<(Character?, DamageContainer) -> ()>,
	DamageTaken: ReadonlySignal<(number) -> ()>,
	Destroyed: ReadonlySignal<Callback>,
	MovesetChanged: ReadonlySignal<(string?, string?) -> ()>,
}

export type Character = typeof(setmetatable({} :: CharacterFields, {} :: CharacterImpl))

export type WCS = {
	CreateServer: () -> Server,
	CreateClient: () -> Client,
	CreateMoveset: (string, { SkillImpl }) -> Moveset,
	RegisterStatusEffect: (string) -> StatusEffectImpl,
	RegisterSkill: (string) -> SkillImpl,
	RegisterHoldableSkill: (string) -> HoldableSkillImpl,
	GetMovesetObjectByName: (string) -> Moveset?,
	Character: CharacterImpl,
	SkillType: SkillTypeEnum,
}

local TS = script:FindFirstChild("include")
		and require(script:WaitForChild("include"):WaitForChild("RuntimeLib") :: ModuleScript)
	or _G[script]

local exports = {}
for _k, _v in TS.import(script, script, "exports") or {} do
	exports[_k] = _v
end

table.freeze(exports)

return exports :: WCS
