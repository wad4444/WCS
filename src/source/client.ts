/* eslint-disable roblox-ts/no-array-pairs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import { t } from "@rbxts/t";
import { isServerContext, logError, logMessage, logWarning, setActiveHandler } from "source/utility";
import { ClientEvents, ClientFunctions } from "./networking";
import { Character, CharacterData } from "./character";
import { Flags } from "./flags";
import { UnknownSkill } from "./skill";
import { UnknownStatus } from "./statusEffect";
import { SerializedData, dispatchSerializer, messageSerializer } from "./serdes";
import { RestoreArgs } from "./arg-converter";
import { INVALID_MESSAGE_STR, ValidateArgs } from "./message";
import { Reflect } from "@flamework/core";
import { atom, subscribe, sync } from "@rbxts/charm";

let currentInstance: Client | undefined = undefined;
export type WCS_Client = Client;

class Client {
    private isActive = false;
    private registeredModules: ModuleScript[] = [];

    private atom = atom<CharacterData | undefined>(undefined);
    private clientSyncer = sync.client({
        atoms: { atom: this.atom },
    });

    constructor(ApplyLoggerMiddleware: boolean) {
        currentInstance = this;
    }

    /**
     * Requires all module scripts in a directory when client starts
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
     * Starts the client
     * @warns if used twice
     */
    public Start() {
        if (this.isActive) {
            logWarning(`Attempted to :Start() Client twice!`);
            return;
        }

        this.registeredModules.forEach((v) => require(v));
        table.clear(this.registeredModules);

        this.isActive = true;

        setActiveHandler(this);
        this.setupCharacterReplication();

        ClientEvents.sync.connect((serialized) => {
            const payload = dispatchSerializer.deserialize(serialized.buffer, serialized.blobs);
            this.clientSyncer.sync(payload as never);
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

            if (Type === "Skill") {
                for (const [_, skill] of pairs(character.GetSkills())) {
                    if (skill.GetId() === SourceId) {
                        source = skill;
                        break;
                    }
                }
            } else if (Type === "Status") {
                for (const [_, status] of pairs(character.GetSkills())) {
                    if (status.GetId() === SourceId) {
                        source = status;
                        break;
                    }
                }
            }

            character.DamageDealt.Fire(undefined, {
                Damage: Damage,
                Source: source,
            });
        });

        const eventHandler = (serialized: SerializedData) => {
            const [Name, MethodName, PackedArgs] = messageSerializer.deserialize(serialized.buffer, serialized.blobs);
            const character = Character.GetLocalCharacter();
            if (!character) return;

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
        ClientEvents.messageToClient.connect(eventHandler);
        ClientEvents.messageToClient_urel.connect(eventHandler);

        ClientFunctions.messageToClient.setCallback((serialized) => {
            const [Name, MethodName, PackedArgs] = messageSerializer.deserialize(serialized.buffer, serialized.blobs);
            const character = Character.GetLocalCharacter();
            if (!character) return;

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

        logMessage(`Started Client successfully`);
    }

    private setupCharacterReplication() {
        let character: Character | undefined;

        subscribe(this.atom, (data) => {
            if (!data || character?.Instance !== data.instance) {
                character?.Destroy();
                character = undefined;
            }
            if (data && !character) {
                character = new Character(data.instance, {
                    flag: Flags.CanCreateCharacterClient,
                    data: this.atom,
                });
            }
        });
    }
}

export function CreateClient(ApplyLoggerMiddleware = false) {
    if (isServerContext()) {
        logError(`Attempted to instantiate Client handler on server side!`);
    }

    if (currentInstance) {
        logWarning(`Attempted to instantiate Client twice. \n Framework does not allow multiple Client instances!`);
        return currentInstance;
    }

    return new Client(ApplyLoggerMiddleware);
}
