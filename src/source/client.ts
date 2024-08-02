import { t } from "@rbxts/t";
import { clientAtom, isServerContext, logError, logMessage, logWarning, setActiveHandler } from "source/utility";
import { ClientEvents, ClientFunctions } from "./networking";
import { Character } from "./character";
import { Flags } from "./flags";
import { UnknownSkill } from "./skill";
import { UnknownStatus } from "./statusEffect";
import { SerializedData, dispatchSerializer, messageSerializer } from "./serdes";
import { RestoreArgs } from "./arg-converter";
import { INVALID_MESSAGE_STR, MessageOptions, ValidateArgs } from "./message";
import { Reflect } from "@flamework/core";
import { subscribe, sync } from "@rbxts/charm";
import { fromSerializeablePayload } from "@rbxts/charm-payload-converter";

let currentInstance: Client | undefined = undefined;
export type WCS_Client = Client;

class Client {
    private isActive = false;
    private registeredModules: ModuleScript[] = [];

    private clientSyncer = sync.client({
        atoms: { atom: clientAtom },
    });

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
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
            const payloads = dispatchSerializer.deserialize(serialized.buffer, serialized.blobs);
            this.clientSyncer.sync(...payloads.map(fromSerializeablePayload));
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

            for (const object of character[Type === "Skill" ? "GetSkills" : "GetAllStatusEffects"]()) {
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
            const [Name, MethodName, PackedArgs] = messageSerializer.deserialize(serialized.buffer, serialized.blobs);
            const character = Character.GetLocalCharacter();
            if (!character) return;

            const skill = character.GetSkillFromString(Name);
            if (!skill) return;

            const args = RestoreArgs(PackedArgs);

            const config = Reflect.getMetadata(skill, `Config_${MethodName}`) as MessageOptions | undefined;
            if (config?.OnlyWhenActive && !skill.GetState().IsActive) return;

            if (config?.Validators) {
                if (!ValidateArgs(config.Validators, args)) return;
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

            const config = Reflect.getMetadata(skill, `Config_${MethodName}`) as MessageOptions | undefined;
            if (config?.OnlyWhenActive && !skill.GetState().IsActive) return INVALID_MESSAGE_STR;

            if (config?.Validators) {
                if (!ValidateArgs(config.Validators, args)) return INVALID_MESSAGE_STR;
            }

            const method = skill[MethodName as never] as (
                self: UnknownSkill,
                ...args: unknown[]
            ) => Promise<unknown> | unknown;
            const returnedValue = method(skill, ...args);
            if (Promise.is(returnedValue)) {
                const [success, value] = returnedValue.await();
                return success ? value : INVALID_MESSAGE_STR;
            }

            return returnedValue;
        });

        logMessage(`Started Client successfully`);
    }

    private setupCharacterReplication() {
        let character: Character | undefined;

        subscribe(clientAtom, (data) => {
            if (!data || character?.Instance !== data.instance) {
                character?.Destroy();
                character = undefined;
            }
            if (data && !character) {
                character = new Character(data.instance, Flags.CanCreateCharacterClient);
            }
        });
    }
}

export function CreateClient() {
    if (isServerContext()) {
        logError(`Attempted to instantiate Client handler on server side!`);
    }

    if (currentInstance) {
        logWarning(`Attempted to instantiate Client twice. \n Framework does not allow multiple Client instances!`);
        return currentInstance;
    }

    return new Client();
}
