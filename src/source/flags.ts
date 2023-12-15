import { Symbol } from "symbol";

export const Flags = {
    CanAssignCustomId: Symbol("__CanAssignCustomID_Flag"),
    CanCreateCharacterClient: Symbol("__CanCreateCharacterClient_Flag"),
    CanInstantiateSkillClient: Symbol("__CanInstantiateSkillClient_Flag"),
} as const;

export interface FlagWithData<T> {
    flag: Symbol;
    data: T;
}
