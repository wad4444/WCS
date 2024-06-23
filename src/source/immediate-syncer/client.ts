/* eslint-disable roblox-ts/no-array-pairs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Atom } from "@rbxts/charm";
import { Payload } from "./server";
import { apply } from "./patch";

export default class client<T extends Record<string, Atom<any>>> {
    constructor(private readonly atoms: T) {}

    public sync(payload: Payload<T>) {
        for (const [_key, _state] of pairs(payload.data)) {
            const key = _key as string;
            if (payload.type === "patch") {
                const state = _state as any[];
                for (const [_, diffs] of pairs(state)) {
                    this.atoms[key](apply(this.atoms[key](), diffs));
                }
            } else {
                this.atoms[key](_state);
            }
        }
    }
}
