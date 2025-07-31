import { Reflect } from "@flamework/core";
import { subscribe } from "@rbxts/charm";
import CharmSync from "@rbxts/charm-sync";
import { t } from "@rbxts/t";
import {
	clientAtom,
	isServerContext,
	logError,
	logMessage,
	logWarning,
	setActiveHandler,
} from "source/utility";
import { RestoreArgs } from "./arg-converter";
import { Character } from "./character";
import { Flags } from "./flags";
import {
	INVALID_MESSAGE_STR,
	MessageContentType,
	type MessageOptions,
	ValidateArgs,
} from "./message";
import { ClientEvents, ClientFunctions } from "./networking";
import { type SerializedData, messageSerializer } from "./serdes";
import type { UnknownSkill } from "./skill";
import type { UnknownStatus } from "./statusEffect";

let currentInstance: Client | undefined = undefined;
export type WCS_Client = Client;

class Client {
	private isActive = false;
	private registeredModules: ModuleScript[] = [];

	private clientSyncer = CharmSync.client({
		atoms: { atom: clientAtom },
		ignoreUnhydrated: false,
	});

	constructor() {
		currentInstance = this;
	}

	/**
	 * Requires all module scripts in a directory when client starts
	 */
	public RegisterDirectory(Directory: Instance) {
		if (this.isActive) {
			logWarning("Cannot register directory after :Start()");
			return;
		}

		if (!t.Instance(Directory)) {
			logWarning("Provided directory is not an instance!");
			return;
		}

		Directory.GetDescendants().forEach((Descendant) => {
			if (!Descendant.IsA("ModuleScript")) return;
			this.registeredModules.push(Descendant);
		});
	}

	/**
	 * Starts the client
	 * @warns if used twice
	 */
	public Start() {
		if (this.isActive) {
			logWarning("Attempted to :Start() Client twice!");
			return;
		}

		this.registeredModules.forEach((v) => require(v));
		table.clear(this.registeredModules);

		this.isActive = true;

		setActiveHandler(this);
		this.setupCharacterReplication();

		ClientEvents.sync.connect((payloads) => {
			this.clientSyncer.sync(...payloads);
		});
		ClientEvents.start();

		ClientEvents.damageTaken.connect((Damage) => {
			const character = Character.GetLocalCharacter();
			if (character) {
				character.DamageTaken.Fire({
					Damage: Damage,
					Source: undefined,
				});
			}
		});

		ClientEvents.damageDealt.connect((SourceId, Type, Damage) => {
			const character = Character.GetLocalCharacter();
			let source: UnknownSkill | UnknownStatus | undefined = undefined;

			if (!character) return;

			for (const object of character[
				Type === "Skill" ? "GetSkills" : "GetAllStatusEffects"
			]()) {
				if (object.GetId() === SourceId) {
					source = object;
					break;
				}
			}

			character.DamageDealt.Fire(undefined, {
				Damage: Damage,
				Source: source,
			});
		});

		const eventHandler = (serialized: SerializedData) => {
			const [ContentType, Name, MethodName, PackedArgs] =
				messageSerializer.deserialize(serialized.buffer, serialized.blobs);
			const character = Character.GetLocalCharacter();
			if (!character) return;

			let messageClass: UnknownSkill | UnknownStatus | undefined;
			if (ContentType === MessageContentType.Skill) {
				messageClass = character.GetSkillFromString(Name);
			} else if (ContentType === MessageContentType.StatusEffect) {
				messageClass = character.GetStatusEffectFromId(Name);
			}
			if (!messageClass) return;

			const args = RestoreArgs(PackedArgs);

			const config = Reflect.getMetadata(
				messageClass,
				`Config_${MethodName}`,
			) as MessageOptions | undefined;
			if (config?.OnlyWhenActive && !messageClass.GetState().IsActive) return;

			if (config?.Validators) {
				if (!ValidateArgs(config.Validators, args)) return;
			}

			const method = messageClass[MethodName as never] as (
				self: UnknownSkill | UnknownStatus,
				...args: unknown[]
			) => unknown;
			method(messageClass, ...args);
		};
		ClientEvents.messageToClient.connect(eventHandler);
		ClientEvents.messageToClient_urel.connect(eventHandler);

		ClientFunctions.messageToClient.setCallback((serialized) => {
			const [ContentType, Name, MethodName, PackedArgs] =
				messageSerializer.deserialize(serialized.buffer, serialized.blobs);
			const character = Character.GetLocalCharacter();
			if (!character) return;

			let messageClass: UnknownSkill | UnknownStatus | undefined;
			if (ContentType === MessageContentType.Skill) {
				messageClass = character.GetSkillFromString(Name);
			} else if (ContentType === MessageContentType.StatusEffect) {
				messageClass = character.GetStatusEffectFromId(Name);
			}
			if (!messageClass) return;

			const args = RestoreArgs(PackedArgs);

			const config = Reflect.getMetadata(
				messageClass,
				`Config_${MethodName}`,
			) as MessageOptions | undefined;
			if (config?.OnlyWhenActive && !messageClass.GetState().IsActive)
				return INVALID_MESSAGE_STR;

			if (config?.Validators) {
				if (!ValidateArgs(config.Validators, args)) return INVALID_MESSAGE_STR;
			}

			const method = messageClass[MethodName as never] as (
				self: UnknownSkill | UnknownStatus,
				...args: unknown[]
			) => Promise<unknown> | unknown;
			const returnedValue = method(messageClass, ...args);
			if (Promise.is(returnedValue)) {
				const [success, value] = returnedValue.await();
				return success ? value : INVALID_MESSAGE_STR;
			}

			return returnedValue;
		});

		logMessage("Started Client successfully");
	}

	private setupCharacterReplication() {
		let character: Character | undefined;

		subscribe(clientAtom, (data) => {
			if (!data || character?.Instance !== data.instance) {
				character?.Destroy(Flags.CanDestroyLocallyClient);
				character = undefined;
			}
			if (data && !character) {
				character = new Character(
					data.instance,
					Flags.CanCreateCharacterClient,
				);
			}
		});
	}
}

export function CreateClient() {
	if (isServerContext()) {
		logError("Attempted to instantiate Client handler on server side!");
	}

	if (currentInstance) {
		logWarning(
			"Attempted to instantiate Client twice. \n Framework does not allow multiple Client instances!",
		);
		return currentInstance;
	}

	return new Client();
}
