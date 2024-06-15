/* eslint-disable roblox-ts/no-array-pairs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { t } from "@rbxts/t";
import { instanceofConstructor, logError, logWarning } from "./utility";
import { SkillBase } from "./skill";
import { RunService } from "@rbxts/services";
import { ConvertArgs } from "./arg-converter";
import { Flamework, Reflect } from "@flamework/core";
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

type ValidateUnreliable<T extends MessageOptions> = T["Unreliable"] extends true
    ? T["Type"] extends "Event"
        ? T
        : never
    : never;

const registeredMessages = new Map<Record<string, any>, string[]>();
const optionsGuard = Flamework.createGuard<MessageOptions>();

/** @internal @hidden */
export function ValidateArgs(validators: t.check<any>[], args: unknown[]) {
    if (!t.strictArray(...validators)(args)) return false;
    return true;
}

export function Message<T extends MessageOptions>(Options: T) {
    return (
        ctor: Record<string, any>,
        methodName: string,
        _: TypedPropertyDescriptor<GetDesiredMethodType<ValidateUnreliable<T>>>,
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

        if (Options.Type !== "Event" && Options.Unreliable) {
            logError(`Unreliable messages must be of type "Event"`);
        }

        if (!optionsGuard(Options)) logError(`Invalid message options. Your Options object did not pass the guard.`);

        if (registeredMessages.get(ctor)?.includes(methodName))
            logError(`Message ${methodName} is already registered.`);
        registeredMessages.set(ctor, [...(registeredMessages.get(ctor) ?? []), methodName]);

        const current = RunService.IsServer() ? "Server" : "Client";
        if (Options.Validators && current === Options.Destination) {
            Reflect.defineMetadata(ctor, `MessageValidators_${methodName}`, Options.Validators);
        }

        if (current === Options.Destination) return;

        ctor[methodName] = function (this: SkillBase, ...args: unknown[]) {
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
