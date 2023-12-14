import { BroadcastReceiver, Broadcaster, createBroadcastReceiver, createBroadcaster } from "@rbxts/reflex";
import { RunService } from "@rbxts/services";
import { t } from "@rbxts/t";
import { logError, logMessage, logWarning, setActiveHandler } from "source/utility";
import { remotes } from "./remotes";
import { slices } from "state/slices";
import { RootState, rootProducer } from "state/rootProducer";
import { devToolsMiddleware } from "state/middleware/devtools";
import { Character } from "./character";
import { Flags } from "./flags";

let currentInstance: Client | undefined = undefined;
export type WCS_Client = Client;
class Client {
    private isActive = false;
    private registeredModules: ModuleScript[] = [];
    private receiver: BroadcastReceiver<typeof slices>;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        currentInstance = this;
        this.receiver = createBroadcastReceiver({
            start: () => {
                remotes._start.fire();
            },
        });
    }

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

    public Start() {
        if (this.isActive) {
            logWarning(`Attempted to :Start() Client twice!`);
            return;
        }

        this.registeredModules.forEach((v) => require(v));
        table.clear(this.registeredModules);

        remotes._dispatch.connect((Actions) => this.receiver.dispatch(Actions));
        rootProducer.applyMiddleware(this.receiver.middleware, devToolsMiddleware);
        this.isActive = true;

        setActiveHandler(this);
        this.setupCharacterReplication();

        logMessage(`Started Client successfully`);
    }

    private setupCharacterReplication() {
        let previousSize = 0;

        const stateUpdated = (State: RootState) => {
            const amount = State.size();
            if (previousSize === amount) {
                return;
            }

            State.forEach((_, Instance) => {
                if (Character.GetCharacterFromInstance(Instance)) {
                    return;
                }

                new Character(Instance, Flags.CanCreateCharacterClient);
            });
            Character.GetCharacterMap().forEach((Character, Instance) => {
                if (State.has(Instance)) {
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

export function CreateClient() {
    if (RunService.IsServer()) {
        logError(`Attempted to instantiate Client handler on server side!`);
    }

    if (currentInstance) {
        logWarning(`Attempted to instantiate Client twice. \n Framework does not allow multiple Client instances!`);
        return currentInstance;
    }

    return new Client();
}
