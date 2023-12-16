export type Handler = {
    Start: (Handler) -> nil;
    RegisterDirectory: (Handler, Instance) -> nil;
    IsActive: () -> boolean;
}

export type ReadonlySignal<T> = {
    Connect: (ReadonlySignal<T>, T) -> RBXScriptConnection;
    Once: (ReadonlySignal<T>, T) -> RBXScriptConnection;
    Wait: (ReadonlySignal<T>) -> nil;
}

export type StatusEffect = {}
export type StatusEffectConstructor = {}

export type Skill = {}
export type SkillConstructor = {}

type AffectableHumanoidProps = {
    WalkSpeed: number;
    JumpPower: number;
    JumpHeight: number;
    AutoRotate: boolean;
}

export type Character = {
    Instance: Instance;
    Humanoid: Humanoid;
    Player: Player?;

    StatusEffectAdded: ReadonlySignal<(StatusEffect) -> nil>;
    StatusEffectRemoved: ReadonlySignal<(StatusEffect) -> nil>;
    DamageTaken: ReadonlySignal<(number) -> nil>;
    Destroyed: ReadonlySignal<() -> nil>;

    Destroy: () -> nil;
    GetId: () -> string;

    SetDefaultProps: (Character, AffectableHumanoidProps) -> nil;
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
    CharacterCreated: ReadonlySignal<(Character) -> nil>;
    CharacterDestroyed: ReadonlySignal<(Character) -> nil>;

    new: (Instance) -> Character;
    GetCharacterMap: () -> {[Instance]: Character};
    GetCharacterFromInstance: (Instance) -> Character?;
}

export type WCS = {
    CreateServer: () -> Handler;
    CreateClient: () -> Handler;
    Character: CharacterClass;
}

return nil