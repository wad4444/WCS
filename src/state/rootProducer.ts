import Immut from "@rbxts/immut";
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
        return Immut.produce(State, (Draft) => {
            const characterData = Draft.get(Character);
            if (!characterData) return Draft;

            Draft.set(Character, {
                ...characterData,
                statusEffects: Immut.produce(characterData.statusEffects, (Draft) => {
                    Draft.set(Id, Data);
                }),
            });
        });
    },
    deleteStatusData: (State, Character: Instance, Id: string) => {
        return Immut.produce(State, (Draft) => {
            const characterData = Draft.get(Character);
            if (!characterData) return Draft;

            Draft.set(Character, {
                ...characterData,
                statusEffects: Immut.produce(characterData.statusEffects, (Draft) => {
                    Draft.delete(Id);
                }),
            });
        });
    },
    patchStatusData: (State, Character: Instance, Id: string, Patch: Partial<StatusData>) => {
        return Immut.produce(State, (Draft) => {
            const characterData = Draft.get(Character);
            if (!characterData) return Draft;

            Draft.set(Character, {
                ...characterData,
                statusEffects: Immut.produce(characterData.statusEffects, (Draft) => {
                    const previous = Draft.get(Id);
                    if (!previous) return;

                    Draft.set(Id, {
                        ...previous,
                        ...Patch,
                    });
                }),
            });
        });
    },
});
