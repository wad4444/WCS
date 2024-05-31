/* eslint-disable roblox-ts/no-array-pairs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { t } from "@rbxts/t";
import { instanceofConstructor, logError, logWarning } from "./utility";
import { SkillBase } from "./skill";
import { RunService } from "@rbxts/services";
import { ConvertArgs } from "./arg-converter";
import { Flamework } from "@flamework/core";
import { ClientEvents, ClientFunctions, ServerEvents, ServerFunctions } from "./networking";
import { messageSerializer } from "./serdes";

/**
 * @hidden
 */
export interface MessageOptions {
    Unreliable?: boolean;
    Destination: "Server" | "Client";
    Type: "Event" | "Request";
    Validators?: t.check<any>[];
}

type GetDesiredMethodType<T extends MessageOptions> = (
    ...args: any[]
) => T["Type"] extends "Request" ? Promise<any> : void;

const registeredMessages = new Map<Record<string, any>, string[]>();
const optionsGuard = Flamework.createGuard<MessageOptions>();

export function Message<T extends MessageOptions>(Options: T) {
    return (ctor: Record<string, any>, methodName: string, _: TypedPropertyDescriptor<GetDesiredMethodType<T>>) => {
        if (!instanceofConstructor(ctor as never, SkillBase as never)) {
            logError(`${ctor} is not a valid skill constructor`);
        }
        if (!rawget(ctor, methodName)) {
            logError(`${ctor} does not have a method named ${methodName}`);
        }
        if (Options.Destination !== "Server" && Options.Destination !== "Client") {
            logError(`Invalid message destination. Must be "Server" or "Client"`);
        }
        if (Options.Type !== "Event" && Options.Type !== "Request") {
            logError(`Invalid message type. Must be "Event" or "Request"`);
        }

        if (!optionsGuard(Options)) logError(`Invalid message options. Your Options object did not pass the guard.`);

        if (registeredMessages.get(ctor)?.includes(methodName))
            logError(`Message ${methodName} is already registered.`);
        registeredMessages.set(ctor, [...(registeredMessages.get(ctor) ?? []), methodName]);

        const current = RunService.IsServer() ? "Server" : "Client";
        if (current === Options.Destination) return;

        ctor[methodName] = function (this: SkillBase, ...args: unknown[]) {
            if (Options.Validators) {
                for (const [Index, Validator] of pairs(Options.Validators)) {
                    if (args[Index] && !Validator(args[Index])) {
                        RunService.IsStudio() &&
                            logWarning(`Argument ${Index + 1} in message ${methodName} is not valid`);
                        return;
                    }
                }
            }
            if (!this.Player) return;

            const serialized = messageSerializer.serialize([
                this.Character.GetId(),
                this.Name,
                methodName,
                ConvertArgs(args),
            ]);

            if (Options.Type === "Event") {
                if (RunService.IsServer()) {
                    ServerEvents.messageToClient.fire(this.Player, serialized);
                    return;
                } else if (RunService.IsClient()) {
                    ClientEvents.messageToServer.fire(serialized);
                    return;
                }
                return;
            }

            if (RunService.IsServer()) {
                return ServerFunctions.messageToClient.invoke(this.Player, serialized);
            } else if (RunService.IsClient()) {
                return ClientFunctions.messageToServer.invoke(serialized);
            }
        };
    };
}
