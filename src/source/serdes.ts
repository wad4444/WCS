import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";

export const dispatchSerializer = createBinarySerializer<{
    type: "init" | "patch";
    data: { atom: unknown };
}>();
export const skillRequestSerializer =
    createBinarySerializer<[Name: string, Action: "End" | "Start", StarterParams: unknown[]]>();
export const messageSerializer =
    createBinarySerializer<[CharacterId: string, Name: string, MethodName: string, Args: Map<number, unknown>]>();

export type SerializedData = {
    buffer: buffer;
    blobs: defined[];
};
