-- Compiled with roblox-ts v2.2.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
--/ <reference types="@rbxts/testez/globals" />
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local RunService = _services.RunService
local Workspace = _services.Workspace
local CreateServer = TS.import(script, game:GetService("ReplicatedStorage"), "library", "exports").CreateServer
print(RunService:IsStudio())
return function()
	local server
	describe("server", function()
		it("should create a server", function()
			server = CreateServer()
			expect(server).to.be.ok()
		end)
		it("should register directories", function()
			server:RegisterDirectory(Workspace)
		end)
		it("should run the server", function()
			server:Start()
		end)
		it("should be active", function()
			expect(server:IsActive()).equal(true)
		end)
		it("should be singleton", function()
			expect(server).equal(CreateServer())
		end)
	end)
end
