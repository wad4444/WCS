import { ProducerMiddleware } from "@rbxts/reflex";
import { ReplicatedStorage, RunService } from "@rbxts/services";
import { RootActions, RootState } from "state/rootProducer";

const event = ReplicatedStorage.FindFirstChild("REFLEX_DEVTOOLS") as RemoteEvent;

export const devToolsMiddleware: ProducerMiddleware<RootState, RootActions> = () => {
    return (nextAction, actionName) => {
        return (...args) => {
            const state = nextAction(...args);
            if (RunService.IsStudio() && event) {
                event.FireServer({ name: actionName, args: [...args], state });
            }

            return state;
        };
    };
};
