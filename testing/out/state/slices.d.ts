/// <reference types="@rbxts/compiler-types" />
/// <reference types="@rbxts/compiler-types" />
export declare const slices: {
    replication: import("@rbxts/reflex").Producer<ReadonlyMap<string, import("..").CharacterData>, {
        setCharacterData: (State: ReadonlyMap<string, import("..").CharacterData>, CharacterIndex: string, CharacterData: import("..").CharacterData) => ReadonlyMap<string, import("..").CharacterData>;
        patchCharacterData: (State: ReadonlyMap<string, import("..").CharacterData>, CharacterIndex: string, Patch: Partial<import("..").CharacterData>) => ReadonlyMap<string, import("..").CharacterData>;
        deleteCharacterData: (State: ReadonlyMap<string, import("..").CharacterData>, CharacterIndex: string) => ReadonlyMap<string, import("..").CharacterData>;
        setStatusData: (State: ReadonlyMap<string, import("..").CharacterData>, CharacterIndex: string, Id: string, Data: import("..").StatusData) => ReadonlyMap<string, import("..").CharacterData>;
        deleteStatusData: (State: ReadonlyMap<string, import("..").CharacterData>, CharacterIndex: string, Id: string) => ReadonlyMap<string, import("..").CharacterData>;
        patchStatusData: (State: ReadonlyMap<string, import("..").CharacterData>, CharacterIndex: string, Id: string, Patch: Partial<import("..").StatusData>) => ReadonlyMap<string, import("..").CharacterData>;
        setSkillData: (State: ReadonlyMap<string, import("..").CharacterData>, CharacterIndex: string, Name: string, Data: import("..").SkillData) => ReadonlyMap<string, import("..").CharacterData>;
        deleteSkillData: (State: ReadonlyMap<string, import("..").CharacterData>, CharacterIndex: string, Name: string) => ReadonlyMap<string, import("..").CharacterData>;
        patchSkillData: (State: ReadonlyMap<string, import("..").CharacterData>, CharacterIndex: string, Name: string, Patch: Partial<import("..").SkillData>) => ReadonlyMap<string, import("..").CharacterData>;
    }>;
};
