/* eslint-disable @typescript-eslint/no-explicit-any */
import { Networking } from "@flamework/networking";
import { SerializedData } from "./serdes";

interface ClientToServerEvents {
    start(): void;
    requestSkill(serialized: SerializedData): void;
    message(serialized: SerializedData): void;
}

interface ServerToClientEvents {
    dispatch(serialized: SerializedData): void;
    message(serialized: SerializedData): void;
    damageTaken(CharacterId: string, Damage: number): void;
    damageDealt(CharacterId: string, SourceId: string, Type: "Skill" | "Status", Damage: number): void;
}

interface ClientToServerFunctions {
    message(serialized: SerializedData): any;
}

interface ServerToClientFunctions {
    message(serialized: SerializedData): any;
}

export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
export const ServerFunctions = GlobalFunctions.createServer({});
export const ClientFunctions = GlobalFunctions.createClient({});

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const ServerEvents = GlobalEvents.createServer({});
export const ClientEvents = GlobalEvents.createClient({});
