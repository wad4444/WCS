/// <reference types="@rbxts/compiler-types" />
import { CharacterData } from "../../source/character";
import { SkillData } from "../../source/skill";
import { StatusData } from "../../source/statusEffect";
type State = ReadonlyMap<string, CharacterData>;
export declare const replicationSlice: import("@rbxts/reflex").Producer<State, {
    setCharacterData: (State: State, CharacterIndex: string, CharacterData: CharacterData) => State;
    patchCharacterData: (State: State, CharacterIndex: string, Patch: Partial<CharacterData>) => State;
    deleteCharacterData: (State: State, CharacterIndex: string) => State;
    setStatusData: (State: State, CharacterIndex: string, Id: string, Data: StatusData) => State;
    deleteStatusData: (State: State, CharacterIndex: string, Id: string) => State;
    patchStatusData: (State: State, CharacterIndex: string, Id: string, Patch: Partial<StatusData>) => State;
    setSkillData: (State: State, CharacterIndex: string, Name: string, Data: SkillData) => State;
    deleteSkillData: (State: State, CharacterIndex: string, Name: string) => State;
    patchSkillData: (State: State, CharacterIndex: string, Name: string, Patch: Partial<SkillData>) => State;
}>;
export {};
