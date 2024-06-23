/* eslint-disable roblox-ts/no-array-pairs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Atom, None, subscribe } from "@rbxts/charm";
import { Janitor } from "@rbxts/janitor";
import setInterval from "./set-interval";
import { diff } from "./patch";
import { Players } from "@rbxts/services";
import { logError } from "source/utility";

export type SyncPatch<T> = {
    readonly [P in keyof T]?: (T[P] extends object ? SyncPatch<T[P]> : T[P]) | (T[P] extends undefined ? None : never);
};

export type ToStates<T extends object> = { [P in keyof T]: T[P] extends Atom<infer S> ? S : never };
export type Payload<T extends Record<string, Atom<any>>> =
    | { type: "init"; data: ToStates<T> }
    | { type: "patch"; data: SyncPatch<T> };

export default class server<T extends Record<string, Atom<any>>> {
    private sync?: (player: Player, payload: Payload<T>) => void;

    private state = new Map<string, never[]>();
    private snapshot = new Map<string, never>();
    private changed = false;

    constructor(private readonly atoms: T) {}

    public connect(callback: (player: Player, payload: Payload<T>) => void) {
        this.sync = callback;
        const janitor = new Janitor();

        for (const [_key, _atom] of pairs(this.atoms)) {
            const key = _key as string;
            const atom = _atom as Atom<any>;

            const cleanup = subscribe(atom, (newState) => {
                this.changed = true;
                this.state.get(key)!.push(newState as never);
            });
            janitor.Add(cleanup);

            this.state.set(key, []);
            this.snapshot.set(key, atom() as never);
        }

        const disconnect = setInterval(() => {
            if (this.changed === false) return;
            const clonedState = table.clone(this.state);

            clonedState.forEach((states, key) => {
                const initialState = this.snapshot.get(key)!;
                const clonedArray = table.clone(states);
                const atom = this.atoms[key] as Atom<any>;

                const mapped = clonedArray.map((state, index) => {
                    const previous = index === 0 ? initialState : clonedArray[index - 1];
                    return diff(previous, state);
                });

                this.state.get(key)!.clear();
                this.snapshot.set(key, atom() as never);
                clonedState.set(key, mapped as never);
            });

            this.changed = false;
            for (const [_, player] of pairs(Players.GetPlayers())) {
                callback(player, {
                    type: "patch",
                    data: clonedState as unknown as SyncPatch<T>,
                });
            }
        }, 0);

        janitor.Add(disconnect);

        return () => janitor.Cleanup();
    }

    public hydrate(player: Player) {
        if (!this.sync) logError(`Call :Connect() before :Hydrate()`);

        this.sync(player, {
            type: "init",
            data: this.state as ToStates<T>,
        });
    }
}
