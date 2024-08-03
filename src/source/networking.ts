/* eslint-disable @typescript-eslint/no-explicit-any */
import { Networking } from "@flamework/networking";
import type { SerializedData } from "./serdes";

interface ClientToServerEvents {
	start(): void;
	requestSkill(serialized: SerializedData): void;
	messageToServer(serialized: SerializedData): void;
	messageToServer_urel: Networking.Unreliable<
		(serialized: SerializedData) => void
	>;
}

interface ServerToClientEvents {
	sync(serialized: SerializedData): void;
	messageToClient(serialized: SerializedData): void;
	messageToClient_urel: Networking.Unreliable<
		(serialized: SerializedData) => void
	>;
	damageTaken(Damage: number): void;
	damageDealt(SourceId: string, Type: "Skill" | "Status", Damage: number): void;
}

interface ClientToServerFunctions {
	messageToServer(serialized: SerializedData): unknown;
}

interface ServerToClientFunctions {
	messageToClient(serialized: SerializedData): unknown;
}

export const GlobalFunctions = Networking.createFunction<
	ClientToServerFunctions,
	ServerToClientFunctions
>();
export const ServerFunctions = GlobalFunctions.createServer({});
export const ClientFunctions = GlobalFunctions.createClient({});

export const GlobalEvents = Networking.createEvent<
	ClientToServerEvents,
	ServerToClientEvents
>();
export const ServerEvents = GlobalEvents.createServer({});
export const ClientEvents = GlobalEvents.createClient({});
