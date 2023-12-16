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
    _startSkill: remote<Server, [CharacterId: string, Name: string, StarterParams: unknown]>(
        t.string,
        t.string,
        t.optional(t.any),
    ),
    _messageToServer: remote<Server, [Character: Instance, Name: string, Message: unknown]>(
        t.Instance,
        t.string,
        t.optional(t.any),
    ),
    _messageToClient: remote<Client, [Character: Instance, Name: string, Message: unknown]>(
        t.Instance,
        t.string,
        t.optional(t.any),
    ),
});
