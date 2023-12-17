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
}

export type StatusEffectConstructor = {
    new: (Character) -> StatusEffect
}

export type Skill = {}
export type SkillConstructor = {}

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
    Character: CharacterClass;
    StatusEffect: StatusEffectConstructor;
}

return nil