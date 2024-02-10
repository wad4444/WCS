/// <reference types="@rbxts/types" />
export type WCS_Client = Client;
declare class Client {
    private _isActive;
    private _registeredModules;
    private _receiver;
    constructor(ApplyLoggerMiddleware: boolean);
    /**
     * Requires all module scripts in a directory when client starts
     */
    RegisterDirectory(Directory: Instance): void;
    /**
     * Starts the client
     * @warns if used twice
     */
    Start(): void;
    private _setupCharacterReplication;
}
export declare function CreateClient(ApplyLoggerMiddleware?: boolean): Client;
export {};
