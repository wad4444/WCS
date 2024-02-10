/// <reference types="@rbxts/compiler-types" />
/// <reference types="@rbxts/compiler-types" />
import { WCS_Client } from "./client";
import { WCS_Server } from "./server";
import { DeepReadonly } from "@rbxts/reflex";
export declare const consolePrefix = "WCS";
export declare function logWarning(Message: string, DisplayTraceback?: boolean): void;
export declare function logError(Message: string, DisplayTraceback?: boolean): never;
export declare function mapToArray<T extends defined, K extends defined>(Map: Map<T, K>): K[];
export declare function logMessage(Message: string): void;
export declare function isServerContext(): boolean;
export declare function isClientContext(): boolean;
export type Constructor<T extends object = object> = new (...args: never[]) => T;
export type ReadonlyDeep<T extends object> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};
export type Handler = WCS_Server | WCS_Client | undefined;
export declare function setActiveHandler(handler: Handler): void;
export declare function getActiveHandler<T extends WCS_Server | WCS_Client>(): T | undefined;
export declare function freezeCheck<T extends object>(obj: T): void;
