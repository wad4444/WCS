import { SkillData, StatusData } from "exports";
import { RootState } from "./rootProducer";

export function SelectCharacterData(CharacterId: string) {
    return function (State: RootState) {
        return State.replication.get(CharacterId);
    };
}

export function SelectStatuses(CharacterId: string) {
    return function (State: RootState) {
        return State.replication.get(CharacterId)?.statusEffects ?? new Map<string, StatusData>();
    };
}

export function SelectSkills(CharacterId: string) {
    return function (State: RootState) {
        return State.replication.get(CharacterId)?.skills ?? new Map<string, SkillData>();
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
