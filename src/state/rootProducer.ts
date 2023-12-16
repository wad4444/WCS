import { InferActions, InferState, combineProducers } from "@rbxts/reflex";
import { slices } from "./slices";

export type RootState = InferState<typeof rootProducer>;
export type RootActions = InferActions<typeof rootProducer>;

export const rootProducer = combineProducers({
    ...slices,
});
