import Immut, { nothing, original } from "@rbxts/immut";
import { InferActions, InferState, createProducer } from "@rbxts/reflex";
import { Character, CharacterData } from "source/character";
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

        return Immut.produce(State, (Draft) => {
            Draft.set(Character, {
                ...currentData,
                ...Patch,
            });
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

        return Immut.produce(State, (Draft) => {
            const statusEffects = Draft.get(Character)?.statusEffects;
            const previous = statusEffects?.get(Id);
            if (!previous) return Draft;

            statusEffects?.set(Id, {
                ...previous,
                ...Patch,
            });
        });
    },
});
