import { Symbol } from "symbol";
import { WCS_Client } from "./client";
import { WCS_Server } from "./server";
import { DeepReadonly } from "@rbxts/reflex";

export const consolePrefix = `WCS`;
const errorString = `--// [${consolePrefix}]: Caught an error in your code //--`;

export function logWarning(Message: string, DisplayTraceback = true) {
    warn(`[${consolePrefix}]: ${Message} \n \n ${DisplayTraceback ?? debug.traceback()}`);
}

export function logError(Message: string, DisplayTraceback = true) {
    error(`\n ${errorString} \n ${Message} \n \n ${DisplayTraceback ?? debug.traceback()}`);
}

export function mapToArray<T extends defined, K extends defined>(Map: Map<T, K>) {
    const arr: K[] = [];
    Map.forEach((Value) => arr.push(Value));
    return arr;
}

export function logMessage(Message: string) {
    print(`[${consolePrefix}]: ${Message}`);
}

export type Constructor<T extends object = object> = new (...args: never[]) => T;
export type ReadonlyDeep<T extends object> = { readonly [P in keyof T]: DeepReadonly<T[P]> };
export type Replicatable = object | number | string | boolean | CFrame | Vector3;

export type Handler = WCS_Server | WCS_Client | undefined;
let activeHandler: Handler = undefined;

export function setActiveHandler(handler: Handler) {
    if (activeHandler) {
        return;
    }
    activeHandler = handler;
}

export function getActiveHandler<T extends WCS_Server | WCS_Client>() {
    return activeHandler as T | undefined;
}
