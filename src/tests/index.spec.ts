/// <reference types="@rbxts/testez/globals" />

import { RunService, Workspace } from "@rbxts/services";
import { CreateServer, type WCS_Server } from "exports";

export = () => {
	let server!: WCS_Server;

	describe("server", () => {
		it("should create a server", () => {
			server = CreateServer();
			expect(server).to.be.ok();
		});
		it("should register directories", () => {
			server.RegisterDirectory(Workspace);
		});
		it("should run the server", () => {
			server.Start();
		});
		it("should be active", () => {
			expect(server.IsActive()).equal(true);
		});
		it("should be a singleton", () => {
			expect(server).equal(CreateServer());
		});
	});
};
