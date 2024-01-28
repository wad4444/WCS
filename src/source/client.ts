/* eslint-disable @typescript-eslint/no-this-alias */
import { BroadcastReceiver, Broadcaster, createBroadcastReceiver, createBroadcaster } from "@rbxts/reflex";
import { RunService } from "@rbxts/services";
import { t } from "@rbxts/t";
import { logError, logMessage, logWarning, setActiveHandler } from "source/utility";
import { remotes } from "./remotes";
import { slices } from "state/slices";
import { devToolsMiddleware } from "state/middleware/devtools";
import { Character } from "./character";
import { Flags } from "./flags";
import { RootState, rootProducer } from "state/rootProducer";
import { certainFlushMiddleware } from "state/middleware/certainFlush";

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
                remotes._start.fire();
            },
        });

        remotes._dispatch.connect((Actions) => {
            this.receiver.dispatch(Actions);
        });
        rootProducer.applyMiddleware(certainFlushMiddleware, this.receiver.middleware);
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
            const character = Character.GetCharacterFromId_TS(CharacterId);
            if (character) {
                character.DamageTaken.Fire({
                    Damage: Damage,
                    Source: undefined,
                });
            }
        });

        logMessage(`Started Client successfully`);
    }

    private setupCharacterReplication() {
        let previousSize = 0;

        const stateUpdated = (State: RootState) => {
            const amount = State.replication.size();
            if (previousSize === amount) {
                return;
            }

            State.replication.forEach((Data, Id) => {
                if (Character.GetCharacterFromInstance_TS(Data.instance)) {
                    return;
                }

                new Character(Data.instance, {
                    flag: Flags.CanCreateCharacterClient,
                    data: Id,
                });
            });
            Character.GetCharacterMap_TS().forEach((Character, Id) => {
                if (State.replication.has(Character.GetId())) {
                    return;
                }

                Character.Destroy();
            });

            previousSize = amount;
        };

        rootProducer.subscribe((State) => stateUpdated(State));
        stateUpdated(rootProducer.getState());
    }
}

export function CreateClient(ApplyLoggerMiddleware = false) {
    if (RunService.IsServer()) {
        logError(`Attempted to instantiate Client handler on server side!`);
    }

    if (currentInstance) {
        logWarning(`Attempted to instantiate Client twice. \n Framework does not allow multiple Client instances!`);
        return currentInstance;
    }

    return new Client(ApplyLoggerMiddleware);
}
