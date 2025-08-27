import { Flamework, Reflect } from "@flamework/core";
import { RunService } from "@rbxts/services";
import { t } from "@rbxts/t";
import { ConvertArgs } from "./arg-converter";
import {
	ClientEvents,
	ClientFunctions,
	ServerEvents,
	ServerFunctions,
} from "./networking";
import { messageSerializer } from "./serdes";
import { SkillBase } from "./skill";
import { StatusEffect } from "./statusEffect";
import {
	instanceofConstructor,
	isClientContext,
	isServerContext,
	logError,
} from "./utility";

/**
 * @hidden
 */
export interface MessageOptions<
	T extends "Event" | "Request" = "Event" | "Request",
> {
	Unreliable?: boolean;
	Destination: "Server" | "Client";
	Type: T;
	Validators?: t.check<any>[];
	OnlyWhenActive?: boolean;
	ValueValidator?: T extends "Request" ? t.check<any> : undefined;
}

export const INVALID_MESSAGE_STR = "__WCS_INVALID_MESSAGE";

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
		const contentType = instanceofConstructor(ctor as never, SkillBase as never)
			? "Skill"
			: instanceofConstructor(ctor as never, StatusEffect as never)
				? "StatusEffect"
				: logError(`${ctor} is not a valid skill/ status effect constructor.`);
		if (!rawget(ctor, methodName)) {
			logError(`${ctor} does not have a method named ${methodName}.`);
		}
		if (Options.Destination !== "Server" && Options.Destination !== "Client") {
			logError(`Invalid message destination. Must be "Server" or "Client".`);
		}
		if (Options.Type !== "Event" && Options.Type !== "Request") {
			logError(`Invalid message type. Must be "Event" or "Request".`);
		}
		if (Options.Type !== "Event" && Options.Unreliable) {
			logError(`Unreliable messages must be of type "Event."`);
		}
		if (Options.ValueValidator && Options.Type !== "Request") {
			logError("Value Validator can only be used with requests.");
		}

		if (!optionsGuard(Options))
			logError(
				"Invalid message options. Your Options object did not pass the guard.",
			);

		if (registeredMessages.get(ctor)?.includes(methodName))
			logError(`Message ${methodName} is already registered.`);
		registeredMessages.set(ctor, [
			...(registeredMessages.get(ctor) ?? []),
			methodName,
		]);

		const current = RunService.IsServer() ? "Server" : "Client";
		if (Options.Validators && current === Options.Destination) {
			Reflect.defineMetadata(ctor, `Config_${methodName}`, Options);
		}

		if (current === Options.Destination) return;

		ctor[methodName] = function (
			this: SkillBase | StatusEffect,
			...args: unknown[]
		) {
			if (!this.Player) return;

			const serialized = messageSerializer.serialize([
				contentType,
				contentType === "Skill" ? this.Name : this.GetId(),
				methodName,
				ConvertArgs(args),
			]);

			if (Options.Type === "Event") {
				if (RunService.IsServer()) {
					const event = Options.Unreliable
						? ServerEvents.messageToClient_urel
						: ServerEvents.messageToClient;
					event.fire(this.Player, serialized);
					return;
				}
				if (RunService.IsClient()) {
					const event = Options.Unreliable
						? ClientEvents.messageToServer_urel
						: ClientEvents.messageToServer;
					event.fire(serialized);
					return;
				}
				return;
			}

			let promise!: Promise<any>;
			if (isServerContext()) {
				promise = ServerFunctions.messageToClient.invoke(
					this.Player,
					serialized,
				);
			} else if (isClientContext()) {
				promise = ClientFunctions.messageToServer.invoke(serialized);
			}

			const outputPromise = new Promise<any>((resolve, reject) => {
				promise.andThen(
					(value: unknown) =>
						value === INVALID_MESSAGE_STR ||
						(Options.ValueValidator && !Options.ValueValidator(value))
							? reject("Arguments did not pass validation.")
							: resolve(value),
					reject,
				);
			});
			const connection = this.Destroyed.Once(() => outputPromise.cancel());
			outputPromise.finally(() => connection.Disconnect());

			return outputPromise;
		};
	};
}
