import Charm from "@rbxts/charm";
import { SerializeablePayload } from "@rbxts/charm-payload-converter";
import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";
import { CharacterData } from "exports";

export const dispatchSerializer =
    createBinarySerializer<SerializeablePayload<{ atom: Charm.Atom<CharacterData | undefined> }>[]>();
export const skillRequestSerializer =
    createBinarySerializer<[Name: string, Action: "End" | "Start", StarterParams: unknown[]]>();
export const messageSerializer =
    createBinarySerializer<[Name: string, MethodName: string, Args: Map<number, unknown>]>();

export type SerializedData = {
    buffer: buffer;
    blobs: defined[];
};
