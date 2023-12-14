import { Broadcaster, createBroadcaster } from "@rbxts/reflex";
import { RunService } from "@rbxts/services";
import { t } from "@rbxts/t";
import { logError, logMessage, logWarning, setActiveHandler } from "source/utility";
import { rootProducer } from "state/rootProducer";
import { remotes } from "./remotes";

let currentInstance: Server | undefined = undefined;
export type WCS_Server = Server;
class Server {
    private isActive = false;
    private registeredModules: ModuleScript[] = [];
    private broadcaster: Broadcaster;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        currentInstance = this;
        this.broadcaster = createBroadcaster({
            producers: { rootProducer },
            dispatch: (Player, Actions) => {
                remotes._dispatch.fire(Player, Actions);
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
            logWarning(`Attempted to :Start() server twice!`);
            return;
        }

        this.registeredModules.forEach((v) => require(v));
        table.clear(this.registeredModules);

        setActiveHandler(this);

        remotes._start.connect((Player) => this.broadcaster.start(Player));
        rootProducer.applyMiddleware(this.broadcaster.middleware);
        this.isActive = true;

        logMessage(`Started server successfully`);
    }
}

export function CreateServer() {
    if (RunService.IsClient()) {
        logError(`Attempted to instantiate server handler on client side!`);
    }

    if (currentInstance) {
        logWarning(`Attempted to instantiate server twice. \n Framework does not allow multiple server instances!`);
        return currentInstance;
    }

    return new Server();
}
