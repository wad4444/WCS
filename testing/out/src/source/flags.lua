-- Compiled with roblox-ts v2.2.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Symbol = TS.import(script, game:GetService("ReplicatedStorage"), "library", "symbol").Symbol
local Flags = {
	CanAssignCustomId = Symbol("__CanAssignCustomID_Flag"),
	CanCreateCharacterClient = Symbol("__CanCreateCharacterClient_Flag"),
	CanInstantiateSkillClient = Symbol("__CanInstantiateSkillClient_Flag"),
}
return {
	Flags = Flags,
}
