-- Compiled with roblox-ts v2.2.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local RunService = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").RunService
local consolePrefix = "WCS"
local errorString = "--// [" .. (consolePrefix .. "]: Caught an error in your code //--")
local function logWarning(Message, DisplayTraceback)
	if DisplayTraceback == nil then
		DisplayTraceback = true
	end
	local _exp = Message
	local _condition = DisplayTraceback
	if _condition == nil then
		_condition = debug.traceback()
	end
	warn("[" .. (consolePrefix .. ("]: " .. (_exp .. (" \n \n " .. tostring(_condition))))))
end
local function logError(Message, DisplayTraceback)
	if DisplayTraceback == nil then
		DisplayTraceback = true
	end
	local _exp = Message
	local _condition = DisplayTraceback
	if _condition == nil then
		_condition = debug.traceback()
	end
	return error("\n " .. (errorString .. (" \n " .. (_exp .. (" \n \n " .. tostring(_condition))))))
end
local function mapToArray(Map)
	local arr = {}
	local _map = Map
	local _arg0 = function(Value)
		local _value = Value
		table.insert(arr, _value)
		return #arr
	end
	for _k, _v in _map do
		_arg0(_v, _k, _map)
	end
	return arr
end
local function logMessage(Message)
	print("[" .. (consolePrefix .. ("]: " .. Message)))
end
local function isServerContext()
	return RunService:IsServer()
end
local function isClientContext()
	return RunService:IsClient() and RunService:IsRunning()
end
local activeHandler = nil
local function setActiveHandler(handler)
	if activeHandler then
		return nil
	end
	activeHandler = handler
end
local function getActiveHandler()
	return activeHandler
end
local function freezeCheck(obj)
	local _ = table.isfrozen(obj) and table.freeze(obj)
end
return {
	logWarning = logWarning,
	logError = logError,
	mapToArray = mapToArray,
	logMessage = logMessage,
	isServerContext = isServerContext,
	isClientContext = isClientContext,
	setActiveHandler = setActiveHandler,
	getActiveHandler = getActiveHandler,
	freezeCheck = freezeCheck,
	consolePrefix = consolePrefix,
}
