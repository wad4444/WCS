/* eslint-disable roblox-ts/no-array-pairs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import { Broadcaster, createBroadcaster } from "@rbxts/reflex";
import { RunService } from "@rbxts/services";
import { t } from "@rbxts/t";
import { isClientContext, logError, logMessage, logWarning, setActiveHandler } from "source/utility";
import { ServerEvents, ServerFunctions } from "./networking";
import { slices } from "state/slices";
import { rootProducer } from "state/rootProducer";
import { Character } from "./character";
import { SelectCharacterData } from "state/selectors";
import Immut from "@rbxts/immut";
import { SerializedData, dispatchSerializer, messageSerializer, skillRequestSerializer } from "./serdes";
import { RestoreArgs } from "./arg-converter";
import { UnknownSkill } from "./skill";
import { Reflect } from "@flamework/core";
import { INVALID_MESSAGE_STR, ValidateArgs } from "./message";

let currentInstance: Server | undefined = undefined;
export type WCS_Server = Server;

class Server {
    private isActive = false;
    private registeredModules: ModuleScript[] = [];
    private broadcaster: Broadcaster;

    constructor() {
        currentInstance = this;

        this.broadcaster = createBroadcaster({
            producers: slices,
            dispatch: (Player, Actions) => {
                const serialized = dispatchSerializer.serialize(Actions);
                ServerEvents.dispatch.fire(Player, serialized);
            },
            beforeHydrate: (Player, State) => {
                return Immut.produce(State, (Draft) => {
                    for (const [Id, _] of State.replication) {
                        const character = Character.GetCharacterFromId(Id);
                        if (!character) continue;

                        if (!this._filterReplicatedCharacters(Player, character)) Draft.replication.delete(Id);
                    }
                });
            },
            beforeDispatch: (Player, Action) => {
                if (!t.string(Action.arguments[0])) return Action;

                const character = Character.GetCharacterFromId(Action.arguments[0]);
                if (!character) return Action;

                if (!this._filterReplicatedCharacters(Player, character)) return;

                return Action;
            },
        });

        rootProducer.applyMiddleware(this.broadcaster.middleware);
        ServerEvents.start.connect((Player) => this.broadcaster.start(Player));
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

        this.registeredModules.forEach((v) => require(v));
        table.clear(this.registeredModules);

        ServerEvents.requestSkill.connect((Player, serialized) => {
            const [CharacterId, SkillName, Action, Params] = skillRequestSerializer.deserialize(
                serialized.buffer,
                serialized.blobs,
            );
            const characterData = SelectCharacterData(CharacterId)(rootProducer.getState());
            if (!characterData) return;

            const character = Character.GetCharacterFromInstance(characterData.instance);
            if (!character || character.Player !== Player) return;

            const skill = character.GetSkillFromString(SkillName);
            if (!skill) return;

            Action === "Start" ? skill.Start(Params as never) : skill.End();
        });

        const eventHandler = (Player: Player, serialized: SerializedData) => {
            const [CharacterId, Name, MethodName, PackedArgs] = messageSerializer.deserialize(
                serialized.buffer,
                serialized.blobs,
            );
            const character = Character.GetCharacterFromId(CharacterId);
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
            const [CharacterId, Name, MethodName, PackedArgs] = messageSerializer.deserialize(
                serialized.buffer,
                serialized.blobs,
            );
            const character = Character.GetCharacterFromId(CharacterId);
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
