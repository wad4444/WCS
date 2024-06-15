/* eslint-disable @typescript-eslint/no-explicit-any */
import { t } from "@rbxts/t";
import { AnySkill, Skill, SkillBase, UnknownSkill } from "./skill";
import { Constructor, freezeCheck, instanceofConstructor, logError } from "./utility";

export interface Moveset {
    readonly Name: string;
    readonly Skills: Constructor<UnknownSkill>[];
}

/**type Parameters<T> = T extends new (...args: infer C) => AnySkill ? C : never;
type TrimFirst<T> = T extends [any, ...infer Rest] ? Rest : never;
type ConstructorWithArgs<T> = T | [T, ...TrimFirst<Parameters<T>>];

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

// Converts union to overloaded function
type UnionToOvlds<U> = UnionToIntersection<U extends any ? (f: U) => void : never>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

// Finally me)
type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
    ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
    : [T, ...A];

type ConvertCtors<T, C = []> = T extends [infer First, ...infer Rest]
    ? [ConstructorWithArgs<First>, ...ConvertCtors<Rest, C>]
    : [];
**/

const registeredMovesets = new Map<string, Moveset>();
/**
 * Creates a moveset with the given name and skills.
 */
export function CreateMoveset(Name: string, Skills: Constructor<AnySkill>[]): Moveset {
    if (registeredMovesets.has(Name)) {
        logError(`StatusEffect with name ${Name} was already registered before`);
    }

    if (!t.table(Skills)) logError(`Skills you provided is not a valid array`);
    Skills.forEach((T) => {
        if (!t.table(T) || !instanceofConstructor(T, SkillBase as never)) {
            logError(`${T} is not a valid skill constructor`);
        }
    });

    const moveset = {
        Name: Name,
        Skills: Skills,
    } as const;

    registeredMovesets.set(Name, moveset);

    setmetatable(moveset, { __tostring: () => Name });
    freezeCheck(moveset);
    freezeCheck(moveset.Skills);

    return moveset;
}

/**
 * Retrieves the moveset object by its name.
 */
export function GetMovesetObjectByName(Name: string) {
    return registeredMovesets.get(Name);
}
