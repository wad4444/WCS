import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";
import { BroadcastAction } from "@rbxts/reflex";

export const dispatchSerializer = createBinarySerializer<BroadcastAction[]>();

export type SerializedData = {
    buffer: buffer;
    blobs: defined[];
};
