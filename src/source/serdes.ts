import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";
import { BroadcastAction } from "@rbxts/reflex";

export const dispatchSerializer = createBinarySerializer<BroadcastAction[]>();
export const skillRequestSerializer =
    createBinarySerializer<[CharacterId: string, Name: string, Action: "End" | "Start", StarterParams: unknown[]]>();
export const messageSerializer =
    createBinarySerializer<[CharacterId: string, Name: string, MethodName: string, Args: Map<number, unknown>]>();

export type SerializedData = {
    buffer: buffer;
    blobs: defined[];
};
