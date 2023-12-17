import { Skill } from "./skill";
import { Constructor } from "./utility";

export interface Moveset {
    readonly Name: string;
    readonly Skills: Constructor<Skill>[];
}

export function CreateMoveset(Name: string, Skills: Constructor<Skill>[]) {
    const moveset = {
        Name: Name,
        Skills: Skills,
    } as const;
    table.freeze(moveset);
    return moveset;
}
