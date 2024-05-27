/* eslint-disable @typescript-eslint/no-this-alias */
import { BroadcastReceiver, createBroadcastReceiver } from "@rbxts/reflex";
import { t } from "@rbxts/t";
import { isServerContext, logError, logMessage, logWarning, setActiveHandler } from "source/utility";
import { ClientEvents, remotes } from "./networking";
import { slices } from "state/slices";
import { devToolsMiddleware } from "state/middleware/devtools";
import { Character } from "./character";
import { Flags } from "./flags";
import { rootProducer } from "state/rootProducer";
import { UnknownSkill } from "./skill";
import { UnknownStatus } from "./statusEffect";
import { dispatchSerializer } from "./serdes";

let currentInstance: Client | undefined = undefined;
export type WCS_Client = Client;
class Client {
    private isActive = false;
    private registeredModules: ModuleScript[] = [];
    private receiver: BroadcastReceiver<typeof slices>;

    constructor(ApplyLoggerMiddleware: boolean) {
        currentInstance = this;

        this.receiver = createBroadcastReceiver({
            start: () => {
                ClientEvents.start.fire();
            },
        });

        ClientEvents.dispatch.connect((serialized) => {
            const actions = dispatchSerializer.deserialize(serialized.buffer, serialized.blobs);
            this.receiver.dispatch(actions);
        });
        rootProducer.applyMiddleware(this.receiver.middleware);
        ApplyLoggerMiddleware && rootProducer.applyMiddleware(devToolsMiddleware);
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

        remotes._damageTaken.connect((CharacterId, Damage) => {
            const character = Character.GetCharacterFromId(CharacterId);
            if (character) {
                character.DamageTaken.Fire({
                    Damage: Damage,
                    Source: undefined,
                });
            }
        });

        remotes._damageDealt.connect((CharacterId, SourceId, Type, Damage) => {
            const character = Character.GetCharacterFromId(CharacterId);
            let source: UnknownSkill | UnknownStatus | undefined = undefined;

            if (Type === "Skill") {
                character?.GetSkills().every((skill) => {
                    if (skill.GetId() === SourceId) {
                        source = skill;
                        return false;
                    }
                    return true;
                });
            } else if (Type === "Status") {
                character?.GetAllStatusEffects().every((status) => {
                    if (status.GetId() === SourceId) {
                        source = status;
                        return false;
                    }
                    return true;
                });
            }

            if (character) {
                character.DamageDealt.Fire(undefined, {
                    Damage: Damage,
                    Source: source,
                });
            }
        });

        logMessage(`Started Client successfully`);
    }

    private setupCharacterReplication() {
        rootProducer.observe(
            (state) => state.replication,
            (_, index) => index,
            (data, id) => {
                const character = new Character(data.instance, {
                    flag: Flags.CanCreateCharacterClient,
                    data: id,
                });

                return () => {
                    character.Destroy();
                };
            },
        );
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
