import { Symbol } from "../symbol";
export declare const Flags: {
    readonly CanAssignCustomId: Symbol;
    readonly CanCreateCharacterClient: Symbol;
    readonly CanInstantiateSkillClient: Symbol;
};
export interface FlagWithData<T> {
    flag: Symbol;
    data: T;
}
