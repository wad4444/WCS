import Signal from "@rbxts/sleitnick-signal";
import { t } from "@rbxts/t";
import type { Character } from "exports";
import { type AnySkill, SkillBase, type UnknownSkill } from "./skill";
import {
	type Constructor,
	freezeCheck,
	instanceofConstructor,
	logError,
} from "./utility";

export interface Moveset {
	readonly Name: string;
	readonly Skills: Constructor<UnknownSkill>[];
	readonly ConstructorParams?:
		| Record<string, any[] | undefined>
		| Map<Constructor<AnySkill>, any[]>;

	OnCharacterAdded: Signal<[character: Character]>;
	OnCharacterRemoved: Signal<[character: Character]>;
}

const registeredMovesets = new Map<string, Moveset>();
/**
 * Creates a moveset with the given name and skills.
 */
export function CreateMoveset(
	Name: string,
	Skills: Constructor<AnySkill>[],
	ConstructorParams?:
		| Record<string, any[] | undefined>
		| Map<Constructor<AnySkill>, any[]>,
): Moveset {
	if (registeredMovesets.has(Name)) {
		logError(`Moveset with name ${Name} was already registered before`);
	}

	if (!t.table(Skills)) logError("Skills you provided is not a valid array");
	Skills.forEach((T) => {
		if (!t.table(T) || !instanceofConstructor(T, SkillBase as never)) {
			logError(`${T} is not a valid skill constructor`);
		}
	});

	const moveset = {
		Name: Name,
		Skills: Skills,
		ConstructorParams: ConstructorParams,
		OnCharacterAdded: new Signal<[character: Character]>(),
		OnCharacterRemoved: new Signal<[character: Character]>(),
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
