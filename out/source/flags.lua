-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Symbol = TS.import(script, script.Parent.Parent, "symbol").Symbol
local Flags = {
	CanAssignCustomId = Symbol("__CanAssignCustomID_Flag"),
	CanCreateCharacterClient = Symbol("__CanCreateCharacterClient_Flag"),
	CanInstantiateSkillClient = Symbol("__CanInstantiateSkillClient_Flag"),
}
return {
	Flags = Flags,
}
