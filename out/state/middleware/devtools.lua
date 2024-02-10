-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local ReplicatedStorage = _services.ReplicatedStorage
local RunService = _services.RunService
local event = ReplicatedStorage:FindFirstChild("REFLEX_DEVTOOLS")
local devToolsMiddleware = function()
	return function(nextAction, actionName)
		return function(...)
			local args = { ... }
			local state = nextAction(unpack(args))
			if RunService:IsStudio() and event then
				local _fn = event
				local _object = {
					name = actionName,
				}
				local _left = "args"
				local _array = {}
				local _length = #_array
				table.move(args, 1, #args, _length + 1, _array)
				_object[_left] = _array
				_object.state = state
				_fn:FireServer(_object)
			end
			return state
		end
	end
end
return {
	devToolsMiddleware = devToolsMiddleware,
}
