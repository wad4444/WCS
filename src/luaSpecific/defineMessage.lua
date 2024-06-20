local luaSpecific = script.Parent
local source = luaSpecific.Parent.source

local skillLib = require(source.skill)
local holdable = require(source.holdableSkill)

local message = require(source.message)
local utility = require(source.utility)

function DefineMessage(fn, options)
	local foundCtor, methodName
	for _, ctor in skillLib.GetRegisteredSkills() do
		if foundCtor then
			break
		end
		for name, method in ctor do
			if method == fn then
				foundCtor, methodName = ctor, name
				break
			end
		end
	end

	local isInvalid = skillLib.SkillBase[methodName] ~= nil
		or skillLib.Skill[methodName] ~= nil
		or holdable.HoldableSkill[methodName] ~= nil

	if not foundCtor or isInvalid or not rawget(foundCtor, methodName) then
		utility.logError("Provided function is not a valid skill method.")
	end

	message.Message(options)(foundCtor, methodName, {
		value = foundCtor[methodName],
	})
end

return {
	DefineMessage = DefineMessage,
}
