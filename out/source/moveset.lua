-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local _utility = TS.import(script, script.Parent, "utility")
local freezeCheck = _utility.freezeCheck
local logError = _utility.logError
local registeredMovesets = {}
--[[
	*
	 * Creates a moveset with the given name and skills.
	 
]]
local function CreateMoveset(Name, Skills)
	local _name = Name
	if registeredMovesets[_name] ~= nil then
		logError("StatusEffect with name " .. (Name .. " was already registered before"))
	end
	local moveset = {
		Name = Name,
		Skills = Skills,
	}
	local _name_1 = Name
	registeredMovesets[_name_1] = moveset
	setmetatable(moveset, {
		__tostring = function()
			return Name
		end,
	})
	freezeCheck(moveset)
	freezeCheck(moveset.Skills)
	return moveset
end
--[[
	*
	 * Retrieves the moveset object by its name.
	 
]]
local function GetMovesetObjectByName(Name)
	local _name = Name
	return registeredMovesets[_name]
end
return {
	CreateMoveset = CreateMoveset,
	GetMovesetObjectByName = GetMovesetObjectByName,
}
