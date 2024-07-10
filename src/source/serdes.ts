import Charm, { Atom } from "@rbxts/charm";
import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";
import { CharacterData } from "exports";

export const dispatchSerializer = createBinarySerializer<{ type: "init" | "patch"; data: unknown }[]>();
export const skillRequestSerializer =
    createBinarySerializer<[Name: string, Action: "End" | "Start", StarterParams: unknown[]]>();
export const messageSerializer =
    createBinarySerializer<[Name: string, MethodName: string, Args: Map<number, unknown>]>();

export type SerializedData = {
    buffer: buffer;
    blobs: defined[];
};
