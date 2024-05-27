/* eslint-disable roblox-ts/no-array-pairs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { t } from "@rbxts/t";
import { instanceofConstructor, logError, logWarning } from "./utility";
import { SkillBase } from "./skill";
import { RunService } from "@rbxts/services";
import { remotes } from "./networking";
import { ConvertArgs } from "./arg-converter";
import { Flamework } from "@flamework/core";

interface MessageOptions {
    Unreliable?: boolean;
    Destination: "Server" | "Client";
    Type: "Event" | "Request";
    Validators?: t.check<any>[];
}

const optionsGuard = Flamework.createGuard<MessageOptions>();

export function Message(Options: Partial<MessageOptions>) {
    return (
        ctor: Record<string, any>,
        methodName: string,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
    ) => {
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

            if (RunService.IsServer()) {
                remotes._messageToClient.fire(
                    this.Player,
                    this.Character.GetId(),
                    this.Name,
                    methodName,
                    ConvertArgs(args),
                );
            } else if (RunService.IsClient()) {
                remotes._messageToServer.fire(this.Character.GetId(), this.Name, methodName, ConvertArgs(args));
            }
        };
    };
}
