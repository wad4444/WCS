-- Compiled with roblox-ts v2.2.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
--/ <reference types="@rbxts/testez/globals" />
local CreateClient = TS.import(script, game:GetService("ReplicatedStorage"), "library", "exports").CreateClient
return function()
	describe("client", function()
		it("should not be instantiated on server side", function()
			expect(CreateClient).to:throw()
		end)
	end)
end
