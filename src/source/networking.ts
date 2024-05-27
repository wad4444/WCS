import { BroadcastAction } from "@rbxts/reflex";
import { Client, Server, createRemotes, remote } from "@rbxts/remo";
import { t } from "@rbxts/t";

export const remotes = createRemotes({
    _dispatch: remote<Client, [Actions: BroadcastAction[]]>(
        t.array(
            t.interface({
                name: t.string,
                arguments: t.array(t.any),
            }),
        ),
    ),
    _start: remote<Server, []>(),
    _requestSkill: remote<
        Server,
        [CharacterId: string, Name: string, Action: "End" | "Start", StarterParams: unknown[]]
    >(t.string, t.string, t.literal("End", "Start"), t.array(t.any)),
    _messageToServer: remote<
        Server,
        [CharacterId: string, Name: string, MethodName: string, Args: Map<number, unknown>]
    >(t.string, t.string, t.string, t.map(t.number, t.any)),
    _messageToClient: remote<
        Client,
        [CharacterId: string, Name: string, MethodName: string, Args: Map<number, unknown>]
    >(t.string, t.string, t.string, t.map(t.number, t.any)),
    _damageTaken: remote<Client, [CharacterId: string, Damage: number]>(t.string, t.number),
    _damageDealt: remote<Client, [CharacterId: string, SourceId: string, Type: "Skill" | "Status", Damage: number]>(
        t.string,
        t.string,
        t.literal("Skill", "Status"),
        t.number,
    ),
});

import { Networking } from "@flamework/networking";
import { SerializedData } from "./serdes";

interface ClientToServerEvents {
    start(): void;
    requestSkill(CharacterId: string, Name: string, Action: "End" | "Start", StarterParams: unknown[]): void;
}

interface ServerToClientEvents {
    dispatch(actions: SerializedData): void;
}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const ServerEvents = GlobalEvents.createServer({
    /* server config */
});
export const ClientEvents = GlobalEvents.createClient({
    /* client config */
});
