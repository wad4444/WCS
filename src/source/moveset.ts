import { Skill } from "./skill";
import { Constructor, logError } from "./utility";

export interface Moveset {
    readonly Name: string;
    readonly Skills: Constructor<Skill>[];
}

const registeredMovesets = new Map<string, Moveset>();

/**
 * Creates a moveset with the given name and skills.
 */
export function CreateMoveset(Name: string, Skills: Constructor<Skill>[]): Moveset {
    if (registeredMovesets.has(Name)) {
        logError(`StatusEffect with name ${Name} was already registered before`);
    }

    const moveset = {
        Name: Name,
        Skills: Skills,
    } as const;

    setmetatable(moveset, { __tostring: () => Name });
    table.freeze(moveset);

    return moveset;
}
