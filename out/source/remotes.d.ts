/// <reference types="remo" />
import { BroadcastAction } from "@rbxts/reflex";
import { Client, Server } from "@rbxts/remo";
export declare const remotes: import("@rbxts/remo").Remotes<{
    _dispatch: import("@rbxts/remo").RemoteBuilder<(Actions: BroadcastAction[]) => void, Client>;
    _start: import("@rbxts/remo").RemoteBuilder<() => void, Server>;
    _requestSkill: import("@rbxts/remo").RemoteBuilder<(CharacterId: string, Name: string, Action: "End" | "Start", StarterParams: unknown) => void, Server>;
    _messageToServer: import("@rbxts/remo").RemoteBuilder<(CharacterId: string, Name: string, Message: unknown) => void, Server>;
    _messageToClient: import("@rbxts/remo").RemoteBuilder<(CharacterId: string, Name: string, Message: unknown) => void, Client>;
    _damageTaken: import("@rbxts/remo").RemoteBuilder<(CharacterId: string, Damage: number) => void, Client>;
}>;
