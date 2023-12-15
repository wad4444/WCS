local luaSpecific = script.Parent
local source = luaSpecific.Parent.source

local statusEffectLib = require(source.statusEffect)
local utility = require(source.utility)

function RegisterStatusEffect(Name)
    if typeof(Name) ~= "string" then
        utility.logError("Not provided a valid name for RegisterStatusEffect")
    end

    local super = statusEffectLib.StatusEffect
    local class = setmetatable({}, {
        __tostring = function()
            return Name
        end,
        __index = super,
    })
    class.__index = class

    function class.new(...)
        local self = setmetatable({}, class)
        return self:constructor(...) or self
    end

    function class:constructor(...)
        super.constructor(self, ...)
    end

    return statusEffectLib.StatusEffectDecorator(class) or class
end

return {
    RegisterStatusEffect = RegisterStatusEffect,
}