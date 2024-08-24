import { atom } from "@rbxts/charm";
import { RunService } from "@rbxts/services";
import type { CharacterData } from "exports";
import type { WCS_Client } from "./client";
import type { Moveset } from "./moveset";
import type { WCS_Server } from "./server";
import type { AnySkill } from "./skill";

export const consolePrefix = "WCS";
const errorString = `--// [${consolePrefix}]: Caught an error in your code //--`;

export function logWarning(Message: string, DisplayTraceback = true) {
	warn(
		`[${consolePrefix}]: ${Message} \n \n ${DisplayTraceback ? debug.traceback() : undefined}`,
	);
}

export function logError(Message: string, DisplayTraceback = true): never {
	return error(
		`\n ${errorString} \n ${Message} \n \n ${DisplayTraceback ? debug.traceback() : undefined}`,
	);
}

export function mapToArray<T extends defined, K extends defined>(
	Map: Map<T, K>,
) {
	const arr: K[] = [];
	Map.forEach((Value) => arr.push(Value));
	return arr;
}

export function createIdGenerator(initialValue = 0, increment = 1) {
	return () => {
		initialValue += increment;
		return initialValue;
	};
}

export function logMessage(Message: string) {
	print(`[${consolePrefix}]: ${Message}`);
}

export function isServerContext() {
	return RunService.IsServer();
}

export function isClientContext() {
	return RunService.IsClient() && RunService.IsRunning();
}

interface ConstructorWithIndex extends Constructor {
	__index: object;
}

export function GetParamsFromMoveset(
	moveset: Moveset,
	skill: Constructor<AnySkill>,
): any[] | undefined {
	if (!moveset.ConstructorParams) return;
	const params = (rawget(moveset.ConstructorParams, skill) ||
		rawget(moveset.ConstructorParams, `${skill}`)) as any[] | undefined;

	if (params && !typeIs(params, "table")) return;
	return params;
}

export function instanceofConstructor<T extends object>(
	constructor: Constructor,
	constructor2: Constructor<T>,
) {
	let currentClass = constructor;
	let metatable = getmetatable(currentClass) as ConstructorWithIndex;

	while (true) {
		if (currentClass === (constructor2 as never)) return true;
		if (!currentClass || !metatable) break;

		currentClass = metatable.__index as ConstructorWithIndex;
		metatable = getmetatable(currentClass) as ConstructorWithIndex;
	}

	return false;
}

export type Constructor<T extends object = object> = new (
	...args: never[]
) => T;
export type DeepWritable<T> = T extends Map<infer K, infer V>
	? Map<K, V>
	: T extends object
		? { -readonly [K in keyof T]: DeepWritable<T[K]> }
		: T;

export type DeepReadonly<T> = T extends Map<infer K, infer V>
	? ReadonlyMap<K, V>
	: T extends object
		? { readonly [K in keyof T]: DeepWritable<T[K]> }
		: T;

export type Handler = WCS_Server | WCS_Client | undefined;
let activeHandler: Handler = undefined;

/** @internal */
export const clientAtom = atom<CharacterData | undefined>(undefined);

export function setActiveHandler(handler: Handler) {
	if (activeHandler) {
		return;
	}
	activeHandler = handler;
}

export function getActiveHandler<T extends WCS_Server | WCS_Client>() {
	return activeHandler as T | undefined;
}

export function freezeCheck<T extends object>(obj: T) {
	!table.isfrozen(obj) && table.freeze(obj);
}

export function shallowEqual(a: object, b: object) {
	for (const [key, value] of pairs(a)) {
		if (b[key as never] !== value) return false;
	}

	for (const [key, value] of pairs(b)) {
		if (a[key as never] !== value) return false;
	}

	return true;
}
