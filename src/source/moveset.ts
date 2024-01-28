import { AnySkill, Skill, UnknownSkill } from "./skill";
import { Constructor, freezeCheck, logError } from "./utility";

export interface Moveset {
    readonly Name: string;
    readonly Skills: Constructor<UnknownSkill>[];
}

const registeredMovesets = new Map<string, Moveset>();

/**
 * Creates a moveset with the given name and skills.
 */
export function CreateMoveset(Name: string, Skills: Constructor<AnySkill>[]): Moveset {
    if (registeredMovesets.has(Name)) {
        logError(`StatusEffect with name ${Name} was already registered before`);
    }

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
