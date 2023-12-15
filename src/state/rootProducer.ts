import Immut, { nothing, original } from "@rbxts/immut";
import { InferActions, InferState, createProducer } from "@rbxts/reflex";
import { Character, CharacterData } from "source/character";
import { SkillData } from "source/skill";
import { StatusData } from "source/statusEffect";

type State = ReadonlyMap<Instance, CharacterData>;
const initialState: State = new Map();

export type RootState = InferState<typeof rootProducer>;
export type RootActions = InferActions<typeof rootProducer>;

export const rootProducer = createProducer(initialState, {
    setCharacterData: (State, Character: Instance, CharacterData: CharacterData) => {
        return Immut.produce(State, (Draft) => {
            Draft.set(Character, CharacterData);
        });
    },
    patchCharacterData: (State, Character: Instance, Patch: Partial<CharacterData>) => {
        const currentData = State.get(Character);
        if (!currentData) return State;

        const patchedData = {
            ...currentData,
            ...Patch,
        };

        return Immut.produce(State, (Draft) => {
            Draft.set(Character, patchedData);
        });
    },
    deleteCharacterData: (State, Character: Instance) => {
        return Immut.produce(State, (Draft) => {
            Draft.delete(Character);
        });
    },
    setStatusData: (State, Character: Instance, Id: string, Data: StatusData) => {
        const characterData = State.get(Character);
        if (!characterData) return State;

        return Immut.produce(State, (Draft) => {
            const statusEffects = Draft.get(Character)?.statusEffects;
            statusEffects?.set(Id, Data);
        });
    },
    deleteStatusData: (State, Character: Instance, Id: string) => {
        const characterData = State.get(Character);
        if (!characterData) return State;

        return Immut.produce(State, (Draft) => {
            const statusEffects = Draft.get(Character)?.statusEffects;
            statusEffects?.delete(Id);
        });
    },
    patchStatusData: (State, Character: Instance, Id: string, Patch: Partial<StatusData>) => {
        const characterData = State.get(Character);
        if (!characterData) return State;

        const previous = characterData.statusEffects.get(Id);
        if (!previous) return State;

        const patchedData = {
            ...previous,
            ...Patch,
        };

        return Immut.produce(State, (Draft) => {
            const statusEffects = Draft.get(Character)?.statusEffects;
            statusEffects?.set(Id, patchedData);
        });
    },
    setSkillData: (State, Character: Instance, Name: string, Data: SkillData) => {
        const characterData = State.get(Character);
        if (!characterData) return State;

        return Immut.produce(State, (Draft) => {
            const skills = Draft.get(Character)?.skills;
            skills?.set(Name, Data);
        });
    },
    deleteSkillData: (State, Character: Instance, Name: string) => {
        const characterData = State.get(Character);
        if (!characterData) return State;

        return Immut.produce(State, (Draft) => {
            const skills = Draft.get(Character)?.skills;
            skills?.delete(Name);
        });
    },
    patchSkillData: (State, Character: Instance, Name: string, Patch: Partial<SkillData>) => {
        const characterData = State.get(Character);
        if (!characterData) return State;

        const previous = characterData.skills.get(Name);
        if (!previous) return State;

        const patchedData = {
            ...previous,
            ...Patch,
        };

        return Immut.produce(State, (Draft) => {
            const skills = Draft.get(Character)?.skills;
            skills?.set(Name, patchedData);
        });
    },
});
