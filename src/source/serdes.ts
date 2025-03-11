import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";

export const skillRequestSerializer =
	createBinarySerializer<
		[Name: string, Action: "End" | "Start", StarterParams: unknown[]]
	>();
export const messageSerializer =
	createBinarySerializer<
		[Name: string, MethodName: string, Args: Map<number, unknown>]
	>();

export type SerializedData = {
	buffer: buffer;
	blobs: defined[];
};
