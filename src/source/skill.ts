import { RunService } from "@rbxts/services";
import { Character } from "./character";
import { FlagWithData, Flags } from "./flags";
import { Constructor, getActiveHandler, logError } from "./utility";

export interface SkillData {}

const registeredSkills = new Map<string, Constructor<Skill>>();
export class Skill {
    private isReplicated: boolean;

    constructor(Character: Character);
    /**
     * @internal Reserved for internal usage
     */
    constructor(Character: Character, AllowClientInstantiation: (typeof Flags)["CanInstantiateSkillClient"]);
    constructor(
        public readonly Character: Character,
        AllowClientInstantiation?: (typeof Flags)["CanInstantiateSkillClient"],
    ) {
        if (!this.Character || tostring(getmetatable(this.Character)) !== "Character") {
            logError(`Not provided a valid character for Skill constructor`);
        }

        if (!getActiveHandler()) {
            logError(`Attempted to instantiate a skill before server has started.`);
        }

        if (RunService.IsClient() && AllowClientInstantiation !== Flags.CanInstantiateSkillClient) {
            logError(`Attempted to instantiate a skill on client`);
        }

        this.isReplicated = RunService.IsClient();
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
