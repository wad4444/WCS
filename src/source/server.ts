/* eslint-disable roblox-ts/no-array-pairs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import { t } from "@rbxts/t";
import { isClientContext, logError, logMessage, logWarning, setActiveHandler } from "source/utility";
import { ServerEvents, ServerFunctions } from "./networking";
import { Character, CharacterData } from "./character";
import { SerializedData, dispatchSerializer, messageSerializer, skillRequestSerializer } from "./serdes";
import { RestoreArgs } from "./arg-converter";
import { UnknownSkill } from "./skill";
import { Reflect } from "@flamework/core";
import { INVALID_MESSAGE_STR, ValidateArgs } from "./message";
import { atom } from "@rbxts/charm";
import immediateSyncer from "./immediate-syncer";

let currentInstance: Server | undefined = undefined;
export type WCS_Server = Server;

class Server {
    private isActive = false;
    private registeredModules: ModuleScript[] = [];

    /** @internal */
    public __WCS_Atom = atom<Map<string, CharacterData>>(new Map());
    private syncer = new immediateSyncer.server({ atom: this.__WCS_Atom });

    constructor() {
        currentInstance = this;
    }

    /** @internal @hidden */
    public _filterReplicatedCharacters(Player: Player, Character: Character) {
        return Character.Instance === Player.Character;
    }

    /**
     * Requires all module scripts in a directory when server starts
     */
    public RegisterDirectory(Directory: Instance) {
        if (this.isActive) {
            logWarning(`Cannot register directory after :Start()`);
            return;
        }

        if (!t.Instance(Directory)) {
            logWarning(`Provided directory is not an instance!`);
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
            logWarning(`Attempted to :Start() server twice!`);
            return;
        }

        this.syncer.connect((player, payload) => {
            const state = payload.data.atom as unknown;
            const correspondingId = player.Character
                ? Character.GetCharacterFromInstance(player.Character)?.GetId()
                : undefined;

            if (!correspondingId) return;

            let data: CharacterData | CharacterData[] | undefined = undefined;
            if (payload.type === "init") {
                data = (state as Map<string, CharacterData>).get(correspondingId);
            } else if (payload.type === "patch") {
                const filtered: CharacterData[] = [];
                (state as Map<string, CharacterData>[]).forEach((value) => {
                    if (value.get(correspondingId)) filtered.push(value.get(correspondingId)!);
                });

                data = filtered;
            }
            if (!data) return;

            const cloned = table.clone(payload.data) as { atom: CharacterData | CharacterData[] };
            cloned.atom = data;

            payload.data = cloned as never;
            const serialized = dispatchSerializer.serialize(payload as never);
            ServerEvents.sync.fire(player, serialized);
        });
        ServerEvents.start.connect((player) => this.syncer.hydrate(player));

        this.registeredModules.forEach((v) => require(v));
        table.clear(this.registeredModules);

        ServerEvents.requestSkill.connect((Player, serialized) => {
            const [SkillName, Action, Params] = skillRequestSerializer.deserialize(serialized.buffer, serialized.blobs);
            const playerCharacter = Player.Character;
            if (!playerCharacter) return;

            const character = Character.GetCharacterFromInstance(playerCharacter);
            if (!character || character.Player !== Player) return;

            const skill = character.GetSkillFromString(SkillName);
            if (!skill) return;

            Action === "Start" ? skill.Start(...Params) : skill.End();
        });

        const eventHandler = (Player: Player, serialized: SerializedData) => {
            const [_, Name, MethodName, PackedArgs] = messageSerializer.deserialize(
                serialized.buffer,
                serialized.blobs,
            );
            const playerCharacter = Player.Character;
            if (!playerCharacter) return;

            const character = Character.GetCharacterFromInstance(playerCharacter);
            if (!character || character.Player !== Player) return;

            const skill = character.GetSkillFromString(Name);
            if (!skill) return;

            const args = RestoreArgs(PackedArgs);
            const validators = Reflect.getMetadata(skill, `MessageValidators_${MethodName}`) as
                | t.check<any>[]
                | undefined;
            if (validators) {
                if (!ValidateArgs(validators, args)) return;
            }

            const method = skill[MethodName as never] as (self: UnknownSkill, ...args: unknown[]) => unknown;
            method(skill, ...args);
        };
        ServerEvents.messageToServer.connect(eventHandler);
        ServerEvents.messageToServer_urel.connect(eventHandler);

        ServerFunctions.messageToServer.setCallback((Player, serialized) => {
            const [_, Name, MethodName, PackedArgs] = messageSerializer.deserialize(
                serialized.buffer,
                serialized.blobs,
            );
            const playerCharacter = Player.Character;
            if (!playerCharacter) return;

            const character = Character.GetCharacterFromInstance(playerCharacter);
            if (!character || character.Player !== Player) return;

            const skill = character.GetSkillFromString(Name);
            if (!skill) return;

            const args = RestoreArgs(PackedArgs);
            const validators = Reflect.getMetadata(skill, `MessageValidators_${MethodName}`) as
                | t.check<any>[]
                | undefined;
            if (validators) {
                if (!ValidateArgs(validators, args)) return INVALID_MESSAGE_STR;
            }

            const method = skill[MethodName as never] as (
                self: UnknownSkill,
                ...args: unknown[]
            ) => Promise<unknown> | unknown;
            const returnedValue = method(skill, ...args);
            if (Promise.is(returnedValue)) {
                const [_, value] = returnedValue.await();
                return value;
            }

            return returnedValue;
        });

        setActiveHandler(this);
        this.isActive = true;

        logMessage(`Started Server successfully`);
    }

    public IsActive() {
        return this.isActive;
    }
}

export function CreateServer() {
    if (isClientContext()) {
        logError(`Attempted to instantiate server handler on client side!`);
    }

    if (currentInstance) {
        logWarning(`Attempted to instantiate server twice. \n Framework does not allow multiple server instances!`);
        return currentInstance;
    }

    return new Server();
}
