-- Compiled with roblox-ts v2.2.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Character = TS.import(script, game:GetService("ReplicatedStorage"), "library", "source", "character").Character
local certainFlushMiddleware = function(producer)
	return function(nextAction, name)
		return function(...)
			local args = { ... }
			local _value = (string.match(name, "delete"))
			if _value ~= 0 and (_value == _value and (_value ~= "" and _value)) then
				local previousState = producer:getState()
				local chars = Character:GetCharacterMap_TS()
				local _arg0 = function(char)
					local _replication = previousState.replication
					local _arg0_1 = char:GetId()
					local oldCharData = _replication[_arg0_1]
					local _exp = char:GetSkills()
					local _arg0_2 = function(skill)
						local _fn = skill
						local _result = oldCharData
						if _result ~= nil then
							local _skills = _result.skills
							local _arg0_3 = skill:GetName()
							_result = _skills[_arg0_3]
						end
						_fn:_proccessDataUpdate(_result)
					end
					for _k, _v in _exp do
						_arg0_2(_v, _k - 1, _exp)
					end
					local _exp_1 = char:GetAllStatusEffects()
					local _arg0_3 = function(status)
						local _fn = status
						local _result = oldCharData
						if _result ~= nil then
							local _statusEffects = _result.statusEffects
							local _arg0_4 = status:GetId()
							_result = _statusEffects[_arg0_4]
						end
						_fn:_proccessDataUpdate(_result)
					end
					for _k, _v in _exp_1 do
						_arg0_3(_v, _k - 1, _exp_1)
					end
				end
				for _k, _v in chars do
					_arg0(_v, _k, chars)
				end
				return nextAction(unpack(args))
			end
			return nextAction(unpack(args))
		end
	end
end
return {
	certainFlushMiddleware = certainFlushMiddleware,
}
