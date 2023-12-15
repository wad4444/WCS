import { Character } from "./character";
import { Constructor, logError } from "./utility";

const registeredSkills = new Map<string, Constructor<Skill>>();
export class Skill {
    constructor(public readonly Character: Character) {
        
    }
}

export function SkillDecorator<T extends Constructor<Skill>>(Constructor: T) {
    const name = tostring(Constructor);
    if (registeredSkills.has(name)) {
        logError(`StatusEffect with name ${name} was already registered before`);
    }

    registeredSkills.set(name, Constructor);
}

export function GetRegisteredSkillConstructor(Name: string) {
    return registeredSkills.get(Name);
}
