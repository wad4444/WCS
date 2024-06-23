/* eslint-disable @typescript-eslint/no-explicit-any */
interface NONE {
    readonly __none: "__none";
}

export declare const NONE: NONE;
export declare function diff(prevState: object, nextState: object): object;
export declare function apply(state: any, patches: any): any;
