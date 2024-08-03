import type Charm from "@rbxts/charm";
import type { SerializeablePayload } from "@rbxts/charm-payload-converter";
import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";
import type { CharacterData } from "exports";

export const dispatchSerializer =
	createBinarySerializer<
		SerializeablePayload<{ atom: Charm.Atom<CharacterData | undefined> }>[]
	>();
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
