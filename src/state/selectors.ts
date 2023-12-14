import { RootState } from "./rootProducer";

export function SelectCharacterData(Character: Instance) {
    return function (State: RootState) {
        return State.get(Character);
    };
}

export function SelectStatusData(Character: Instance, Id: string) {
    return function (State: RootState) {
        return State.get(Character)?.statusEffects.get(Id);
    };
}
