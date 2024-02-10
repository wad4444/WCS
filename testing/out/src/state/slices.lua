-- Compiled with roblox-ts v2.2.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local replicationSlice = TS.import(script, game:GetService("ReplicatedStorage"), "library", "state", "slicesContainer", "replication").replicationSlice
local slices = {
	replication = replicationSlice,
}
return {
	slices = slices,
}
