/* eslint-disable roblox-ts/no-array-pairs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Producer } from "@rbxts/reflex";

type Keys<T> = T extends readonly any[] ? number : T extends ReadonlyMap<infer K, any> ? K : keyof T;
type Values<T> = T extends readonly any[] ? T[number] : T extends ReadonlyMap<any, infer V> ? V : T[keyof T];

export function observeEntity<T extends Producer, V, State = T extends Producer<infer U, any> ? U : never>(
    Producer: T,
    selector: (state: State) => V | undefined,
    observer: (
        item: NonNullable<Values<V>>,
        index: Keys<V>,
    ) => ((beforeDestroy: NonNullable<Values<V>>) => void) | void,
) {
    const idToCleanup = new Map<string, Exclude<ReturnType<typeof observer>, void>>();

    const onChange = (current: V | undefined, previous: V | undefined) => {
        if (!current) {
            idToCleanup.forEach((T, id) => T(previous![id as never]));
            return;
        }
        for (const [_id, entity] of pairs(current)) {
            const id = _id as never;
            if (!previous?.[id]) {
                const cleanup = observer(entity as never, id as never);
                if (cleanup) idToCleanup.set(id, cleanup);

                Producer.once(
                    selector,
                    (state, old) => state?.[id] === undefined && old?.[id] !== undefined,
                    (_, old) => {
                        cleanup?.(old![id]);
                        idToCleanup.delete(id);
                    },
                );
            }
        }
    };

    const unsub = Producer.subscribe(selector, onChange);
    onChange(Producer.getState(selector), undefined);

    return () => {
        idToCleanup.forEach((T, id) => T(Producer.getState(selector)![id as never]));
        idToCleanup.clear();
        unsub();
    };
}
