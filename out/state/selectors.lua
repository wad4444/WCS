-- Compiled with roblox-ts v2.2.0
local function SelectCharacterData(CharacterId)
	return function(State)
		local _replication = State.replication
		local _characterId = CharacterId
		return _replication[_characterId]
	end
end
local function SelectStatusData(CharacterId, Id)
	return function(State)
		local _replication = State.replication
		local _characterId = CharacterId
		local _result = _replication[_characterId]
		if _result ~= nil then
			local _statusEffects = _result.statusEffects
			local _id = Id
			_result = _statusEffects[_id]
		end
		return _result
	end
end
local function SelectSkillData(CharacterId, Name)
	return function(State)
		local _replication = State.replication
		local _characterId = CharacterId
		local _result = _replication[_characterId]
		if _result ~= nil then
			local _skills = _result.skills
			local _name = Name
			_result = _skills[_name]
		end
		return _result
	end
end
return {
	SelectCharacterData = SelectCharacterData,
	SelectStatusData = SelectStatusData,
	SelectSkillData = SelectSkillData,
}
