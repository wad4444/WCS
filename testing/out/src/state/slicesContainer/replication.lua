-- Compiled with roblox-ts v2.2.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Immut = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "immut", "src")
local createProducer = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "reflex", "src").createProducer
local initialState = {}
local replicationSlice = createProducer(initialState, {
	setCharacterData = function(State, CharacterIndex, CharacterData)
		return Immut.produce(State, function(Draft)
			local _draft = Draft
			local _characterIndex = CharacterIndex
			local _characterData = CharacterData
			_draft[_characterIndex] = _characterData
		end)
	end,
	patchCharacterData = function(State, CharacterIndex, Patch)
		local _state = State
		local _characterIndex = CharacterIndex
		local currentData = _state[_characterIndex]
		if not currentData then
			return State
		end
		local _object = {}
		for _k, _v in currentData do
			_object[_k] = _v
		end
		for _k, _v in Patch do
			_object[_k] = _v
		end
		local patchedData = _object
		return Immut.produce(State, function(Draft)
			local _draft = Draft
			local _characterIndex_1 = CharacterIndex
			_draft[_characterIndex_1] = patchedData
		end)
	end,
	deleteCharacterData = function(State, CharacterIndex)
		return Immut.produce(State, function(Draft)
			local _draft = Draft
			local _characterIndex = CharacterIndex
			_draft[_characterIndex] = nil
		end)
	end,
	setStatusData = function(State, CharacterIndex, Id, Data)
		local _state = State
		local _characterIndex = CharacterIndex
		local characterData = _state[_characterIndex]
		if not characterData then
			return State
		end
		return Immut.produce(State, function(Draft)
			local _draft = Draft
			local _characterIndex_1 = CharacterIndex
			local _statusEffects = _draft[_characterIndex_1]
			if _statusEffects ~= nil then
				_statusEffects = _statusEffects.statusEffects
			end
			local statusEffects = _statusEffects
			local _result = statusEffects
			if _result ~= nil then
				local _id = Id
				local _data = Data
				_result[_id] = _data
			end
		end)
	end,
	deleteStatusData = function(State, CharacterIndex, Id)
		local _state = State
		local _characterIndex = CharacterIndex
		local characterData = _state[_characterIndex]
		if not characterData then
			return State
		end
		return Immut.produce(State, function(Draft)
			local _draft = Draft
			local _characterIndex_1 = CharacterIndex
			local _statusEffects = _draft[_characterIndex_1]
			if _statusEffects ~= nil then
				_statusEffects = _statusEffects.statusEffects
			end
			local statusEffects = _statusEffects
			local _result = statusEffects
			if _result ~= nil then
				local _id = Id
				_result[_id] = nil
			end
		end)
	end,
	patchStatusData = function(State, CharacterIndex, Id, Patch)
		local _state = State
		local _characterIndex = CharacterIndex
		local characterData = _state[_characterIndex]
		if not characterData then
			return State
		end
		local _statusEffects = characterData.statusEffects
		local _id = Id
		local previous = _statusEffects[_id]
		if not previous then
			return State
		end
		local _object = {}
		for _k, _v in previous do
			_object[_k] = _v
		end
		for _k, _v in Patch do
			_object[_k] = _v
		end
		local patchedData = _object
		return Immut.produce(State, function(Draft)
			local _draft = Draft
			local _characterIndex_1 = CharacterIndex
			local _statusEffects_1 = _draft[_characterIndex_1]
			if _statusEffects_1 ~= nil then
				_statusEffects_1 = _statusEffects_1.statusEffects
			end
			local statusEffects = _statusEffects_1
			local _result = statusEffects
			if _result ~= nil then
				local _id_1 = Id
				_result[_id_1] = patchedData
			end
		end)
	end,
	setSkillData = function(State, CharacterIndex, Name, Data)
		local _state = State
		local _characterIndex = CharacterIndex
		local characterData = _state[_characterIndex]
		if not characterData then
			return State
		end
		return Immut.produce(State, function(Draft)
			local _draft = Draft
			local _characterIndex_1 = CharacterIndex
			local _skills = _draft[_characterIndex_1]
			if _skills ~= nil then
				_skills = _skills.skills
			end
			local skills = _skills
			local _result = skills
			if _result ~= nil then
				local _name = Name
				local _data = Data
				_result[_name] = _data
			end
		end)
	end,
	deleteSkillData = function(State, CharacterIndex, Name)
		local _state = State
		local _characterIndex = CharacterIndex
		local characterData = _state[_characterIndex]
		if not characterData then
			return State
		end
		return Immut.produce(State, function(Draft)
			local _draft = Draft
			local _characterIndex_1 = CharacterIndex
			local _skills = _draft[_characterIndex_1]
			if _skills ~= nil then
				_skills = _skills.skills
			end
			local skills = _skills
			local _result = skills
			if _result ~= nil then
				local _name = Name
				_result[_name] = nil
			end
		end)
	end,
	patchSkillData = function(State, CharacterIndex, Name, Patch)
		local _state = State
		local _characterIndex = CharacterIndex
		local characterData = _state[_characterIndex]
		if not characterData then
			return State
		end
		local _skills = characterData.skills
		local _name = Name
		local previous = _skills[_name]
		if not previous then
			return State
		end
		local _object = {}
		for _k, _v in previous do
			_object[_k] = _v
		end
		for _k, _v in Patch do
			_object[_k] = _v
		end
		local patchedData = _object
		return Immut.produce(State, function(Draft)
			local _draft = Draft
			local _characterIndex_1 = CharacterIndex
			local _skills_1 = _draft[_characterIndex_1]
			if _skills_1 ~= nil then
				_skills_1 = _skills_1.skills
			end
			local skills = _skills_1
			local _result = skills
			if _result ~= nil then
				local _name_1 = Name
				_result[_name_1] = patchedData
			end
		end)
	end,
})
return {
	replicationSlice = replicationSlice,
}
