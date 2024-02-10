/// <reference types="@rbxts/testez/globals" />

import { Workspace } from "@rbxts/services";
import { CreateServer, WCS_Server } from "exports";

export = function () {
    describe("server", () => {
        let server!: WCS_Server;
        it("should create a server", () => {
            server = CreateServer();
            expect(server).to.be.ok();
        });
        it("should register directories", () => {
            expect(server.Start()).to.be.ok();
        });
        it("should run the server", () => {
            expect(server.Start()).to.be.ok();
        });
        it("should be active", () => {
            expect(server.IsActive()).equal(true);
        });
        it("should be singleton", () => {
            expect(server).equal(CreateServer());
        });
    });
};
