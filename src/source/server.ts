import { Reflect } from "@flamework/core";
import { atom } from "@rbxts/charm";
import CharmSync from "@rbxts/charm-sync";
import { Players } from "@rbxts/services";
import { t } from "@rbxts/t";
import type { UnknownStatus } from "exports";
import {
	isClientContext,
	logError,
	logMessage,
	logWarning,
	setActiveHandler,
} from "source/utility";
import { RestoreArgs } from "./arg-converter";
import { Character, type CharacterData } from "./character";
import {
	INVALID_MESSAGE_STR,
	type MessageOptions,
	ValidateArgs,
} from "./message";
import { ServerEvents, ServerFunctions } from "./networking";
import {
	type SerializedData,
	messageSerializer,
	skillRequestSerializer,
} from "./serdes";
import type { UnknownSkill } from "./skill";

let currentInstance: Server | undefined = undefined;
export type WCS_Server = Server;

class Server {
	private isActive = false;
	private registeredModules: ModuleScript[] = [];

	/** @internal */
	public atom = atom<Map<string, CharacterData>>(new Map());
	private syncer = CharmSync.server({
		atoms: { atom: this.atom },
		preserveHistory: true,
	});

	constructor() {
		currentInstance = this;
	}

	/** @internal @hidden */
	public filterReplicatedCharacters(Player: Player, Character: Character) {
		return Character.Instance === Player.Character;
	}

	/**
	 * Requires all module scripts in a directory when server starts
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
	 * Starts the server
	 * @warns if used twice
	 */
	public Start() {
		if (this.isActive) {
			logWarning("Attempted to :Start() server twice!");
			return;
		}

		const assignedIdentifiers = new Map<Player, string>();
		Players.PlayerRemoving.Connect((player) =>
			assignedIdentifiers.delete(player),
		);

		this.syncer.connect((player, ...payloads) => {
			const correspondingId =
				(player.Character
					? Character.GetCharacterFromInstance(player.Character)?.GetId()
					: undefined) ?? assignedIdentifiers.get(player);
			if (!correspondingId) return;
			assignedIdentifiers.set(player, correspondingId);

			type ModifiedPayload = CharmSync.SyncPayload<{
				atom: Charm.Atom<CharacterData | undefined>;
			}>;
			const modified: ModifiedPayload[] = [];

			for (const payload of payloads) {
				if (payload.type === "init") {
					const data = payload.data.atom;
					const characterData = data.get(correspondingId);
					if (characterData) {
						modified.push({
							type: "init",
							data: { atom: characterData },
						});
					}
					continue;
				}

				const data = payload.data.atom;
				if (data === undefined) continue;

				const characterData = data.get(correspondingId);
				if (characterData === undefined) continue;

				modified.push({
					type: "patch",
					data: { atom: characterData as never },
				});
			}

			ServerEvents.sync.fire(player, modified);
		});
		ServerEvents.start.connect((player) => this.syncer.hydrate(player));

		this.registeredModules.forEach((v) => require(v));
		table.clear(this.registeredModules);

		ServerEvents.requestSkill.connect((Player, serialized) => {
			const [SkillName, Action, Params] = skillRequestSerializer.deserialize(
				serialized.buffer,
				serialized.blobs,
			);
			const playerCharacter = Player.Character;
			if (!playerCharacter) return;

			const character = Character.GetCharacterFromInstance(playerCharacter);
			if (!character || character.Player !== Player) return;

			const skill = character.GetSkillFromString(SkillName);
			if (!skill) return;

			Action === "Start" ? skill.Start(...Params) : skill.End();
		});

		const eventHandler = (Player: Player, serialized: SerializedData) => {
			const [ContentType, Name, MethodName, PackedArgs] =
				messageSerializer.deserialize(serialized.buffer, serialized.blobs);
			const playerCharacter = Player.Character;
			if (!playerCharacter) return;

			const character = Character.GetCharacterFromInstance(playerCharacter);
			if (!character || character.Player !== Player) return;

			let messageClass: UnknownSkill | UnknownStatus | undefined;
			if (ContentType === "Skill") {
				messageClass = character.GetSkillFromString(Name);
			} else if (ContentType === "StatusEffect") {
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
		ServerEvents.messageToServer.connect(eventHandler);
		ServerEvents.messageToServer_urel.connect(eventHandler);

		ServerFunctions.messageToServer.setCallback((Player, serialized) => {
			const [ContentType, Name, MethodName, PackedArgs] =
				messageSerializer.deserialize(serialized.buffer, serialized.blobs);
			const playerCharacter = Player.Character;
			if (!playerCharacter) return;

			const character = Character.GetCharacterFromInstance(playerCharacter);
			if (!character || character.Player !== Player) return;

			const messageClass =
				ContentType === "Skill"
					? character.GetSkillFromString(Name)
					: character.GetStatusEffectFromId(Name);
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
				const [_, value] = returnedValue.await();
				return value;
			}

			return returnedValue;
		});

		setActiveHandler(this);
		this.isActive = true;

		logMessage("Started Server successfully");
	}

	public IsActive() {
		return this.isActive;
	}
}

export function CreateServer() {
	if (isClientContext()) {
		logError("Attempted to instantiate server handler on client side!");
	}

	if (currentInstance) {
		logWarning(
			"Attempted to instantiate server twice. \n Framework does not allow multiple server instances!",
		);
		return currentInstance;
	}

	return new Server();
}
