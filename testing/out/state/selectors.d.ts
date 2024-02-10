import { RootState } from "./rootProducer";
export declare function SelectCharacterData(CharacterId: string): (State: RootState) => import("..").CharacterData | undefined;
export declare function SelectStatusData(CharacterId: string, Id: string): (State: RootState) => import("..").StatusData | undefined;
export declare function SelectSkillData(CharacterId: string, Name: string): (State: RootState) => import("..").SkillData | undefined;
