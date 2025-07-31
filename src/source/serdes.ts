import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";
import type { MessageContentType } from "exports";

export const skillRequestSerializer =
	createBinarySerializer<
		[Name: string, Action: "End" | "Start", StarterParams: unknown[]]
	>();
export const messageSerializer =
	createBinarySerializer<
		[
			ContentType: MessageContentType,
			Name: string,
			MethodName: string,
			Args: Map<number, unknown>,
		]
	>();

export type SerializedData = {
	buffer: buffer;
	blobs: defined[];
};
