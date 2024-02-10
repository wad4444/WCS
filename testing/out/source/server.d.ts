/// <reference types="@rbxts/types" />
import { Character } from "./character";
export type WCS_Server = Server;
declare class Server {
    /**
     * A function that decides whether or not character should be replicated to the given player.
     */
    FilterReplicatedCharacters: (Player: Player, Character: Character) => boolean;
    private isActive;
    private registeredModules;
    private broadcaster;
    constructor();
    /**
     * Requires all module scripts in a directory when server starts
     */
    RegisterDirectory(Directory: Instance): void;
    /**
     * Starts the server
     * @warns if used twice
     */
    Start(): void;
    IsActive(): boolean;
}
export declare function CreateServer(): Server;
export {};
