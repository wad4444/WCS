import { RootState } from "./rootProducer";

export function SelectCharacterData(CharacterId: string) {
    return function (State: RootState) {
        return State.replication.get(CharacterId);
    };
}

export function SelectStatusData(CharacterId: string, Id: string) {
    return function (State: RootState) {
        return State.replication.get(CharacterId)?.statusEffects.get(Id);
    };
}

export function SelectSkillData(CharacterId: string, Name: string) {
    return function (State: RootState) {
        return State.replication.get(CharacterId)?.skills.get(Name);
    };
}
