import { AnySkill, UnknownSkill } from "./skill";
import { Constructor } from "./utility";
export interface Moveset {
    readonly Name: string;
    readonly Skills: Constructor<UnknownSkill>[];
}
/**
 * Creates a moveset with the given name and skills.
 */
export declare function CreateMoveset(Name: string, Skills: Constructor<AnySkill>[]): Moveset;
/**
 * Retrieves the moveset object by its name.
 */
export declare function GetMovesetObjectByName(Name: string): Moveset | undefined;
