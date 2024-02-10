-- Compiled with roblox-ts v2.2.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local TestEZ = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "testez", "src")
TestEZ.TestBootstrap:run({ game:GetService("ReplicatedStorage"):FindFirstChild("library") }, TestEZ.Reporters.TextReporter)
