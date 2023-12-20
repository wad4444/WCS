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
    _requestSkill: remote<Server, [CharacterId: string, Name: string, Action: "End" | "Start", StarterParams: unknown]>(
        t.string,
        t.string,
        t.literal("End", "Start"),
        t.optional(t.any),
    ),
    _messageToServer: remote<Server, [CharacterId: string, Name: string, Message: unknown]>(
        t.string,
        t.string,
        t.optional(t.any),
    ),
    _messageToClient: remote<Client, [CharacterId: string, Name: string, Message: unknown]>(
        t.string,
        t.string,
        t.optional(t.any),
    ),
    _damageTaken: remote<Client, [CharacterId: string, Damage: number]>(t.string, t.number),
});
