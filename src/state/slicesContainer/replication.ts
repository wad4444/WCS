import Immut from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";
import { CharacterData } from "source/character";
import { SkillData } from "source/skill";
import { StatusData } from "source/statusEffect";

type State = ReadonlyMap<string, CharacterData>;
const initialState: State = new Map();

export const replicationSlice = createProducer(initialState, {
    setCharacterData: (State, CharacterIndex: string, CharacterData: CharacterData) => {
        return Immut.produce(State, (Draft) => {
            Draft.set(CharacterIndex, CharacterData);
        });
    },
    patchCharacterData: (State, CharacterIndex: string, Patch: Partial<CharacterData>) => {
        const currentData = State.get(CharacterIndex);
        if (!currentData) return State;

        const patchedData = {
            ...currentData,
            ...Patch,
        };

        return Immut.produce(State, (Draft) => {
            Draft.set(CharacterIndex, patchedData);
        });
    },
    deleteCharacterData: (State, CharacterIndex: string) => {
        return Immut.produce(State, (Draft) => {
            Draft.delete(CharacterIndex);
        });
    },
    setStatusData: (State, CharacterIndex: string, Id: string, Data: StatusData) => {
        const characterData = State.get(CharacterIndex);
        if (!characterData) return State;

        return Immut.produce(State, (Draft) => {
            const statusEffects = Draft.get(CharacterIndex)?.statusEffects;
            statusEffects?.set(Id, Data);
        });
    },
    deleteStatusData: (State, CharacterIndex: string, Id: string) => {
        const characterData = State.get(CharacterIndex);
        if (!characterData) return State;

        return Immut.produce(State, (Draft) => {
            const statusEffects = Draft.get(CharacterIndex)?.statusEffects;
            statusEffects?.delete(Id);
        });
    },
    patchStatusData: (State, CharacterIndex: string, Id: string, Patch: Partial<StatusData>) => {
        const characterData = State.get(CharacterIndex);
        if (!characterData) return State;

        const previous = characterData.statusEffects.get(Id);
        if (!previous) return State;

        const patchedData = {
            ...previous,
            ...Patch,
        };

        return Immut.produce(State, (Draft) => {
            const statusEffects = Draft.get(CharacterIndex)?.statusEffects;
            statusEffects?.set(Id, patchedData);
        });
    },
    setSkillData: (State, CharacterIndex: string, Name: string, Data: SkillData) => {
        const characterData = State.get(CharacterIndex);
        if (!characterData) return State;

        return Immut.produce(State, (Draft) => {
            const skills = Draft.get(CharacterIndex)?.skills;
            skills?.set(Name, Data);
        });
    },
    deleteSkillData: (State, CharacterIndex: string, Name: string) => {
        const characterData = State.get(CharacterIndex);
        if (!characterData) return State;

        return Immut.produce(State, (Draft) => {
            const skills = Draft.get(CharacterIndex)?.skills;
            skills?.delete(Name);
        });
    },
    patchSkillData: (State, CharacterIndex: string, Name: string, Patch: Partial<SkillData>) => {
        const characterData = State.get(CharacterIndex);
        if (!characterData) return State;

        const previous = characterData.skills.get(Name);
        if (!previous) return State;

        const patchedData = {
            ...previous,
            ...Patch,
        };

        return Immut.produce(State, (Draft) => {
            const skills = Draft.get(CharacterIndex)?.skills;
            skills?.set(Name, patchedData);
        });
    },
});
