-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
-- eslint-disable @typescript-eslint/no-this-alias 
local createBroadcastReceiver = TS.import(script, TS.getModule(script, "@rbxts", "reflex").src).createBroadcastReceiver
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local t = TS.import(script, TS.getModule(script, "@rbxts", "t").lib.ts).t
local _utility = TS.import(script, script.Parent, "utility")
local logError = _utility.logError
local logMessage = _utility.logMessage
local logWarning = _utility.logWarning
local setActiveHandler = _utility.setActiveHandler
local remotes = TS.import(script, script.Parent, "remotes").remotes
local devToolsMiddleware = TS.import(script, script.Parent.Parent, "state", "middleware", "devtools").devToolsMiddleware
local Character = TS.import(script, script.Parent, "character").Character
local Flags = TS.import(script, script.Parent, "flags").Flags
local rootProducer = TS.import(script, script.Parent.Parent, "state", "rootProducer").rootProducer
local certainFlushMiddleware = TS.import(script, script.Parent.Parent, "state", "middleware", "certainFlush").certainFlushMiddleware
local currentInstance = nil
local Client
do
	Client = setmetatable({}, {
		__tostring = function()
			return "Client"
		end,
	})
	Client.__index = Client
	function Client.new(...)
		local self = setmetatable({}, Client)
		return self:constructor(...) or self
	end
	function Client:constructor(ApplyLoggerMiddleware)
		self._isActive = false
		self._registeredModules = {}
		currentInstance = self
		self._receiver = createBroadcastReceiver({
			start = function()
				remotes._start:fire()
			end,
		})
		remotes._dispatch:connect(function(Actions)
			self._receiver:dispatch(Actions)
		end)
		rootProducer:applyMiddleware(certainFlushMiddleware, self._receiver.middleware)
		local _ = ApplyLoggerMiddleware and rootProducer:applyMiddleware(devToolsMiddleware)
	end
	function Client:RegisterDirectory(Directory)
		if self._isActive then
			logWarning("Cannot register directory after :Start()")
			return nil
		end
		if not t.Instance(Directory) then
			logWarning("Provided directory is not an instance!")
			return nil
		end
		local _exp = Directory:GetDescendants()
		local _arg0 = function(Descendant)
			if not Descendant:IsA("ModuleScript") then
				return nil
			end
			local __registeredModules = self._registeredModules
			local _descendant = Descendant
			table.insert(__registeredModules, _descendant)
		end
		for _k, _v in _exp do
			_arg0(_v, _k - 1, _exp)
		end
	end
	function Client:Start()
		if self._isActive then
			logWarning("Attempted to :Start() Client twice!")
			return nil
		end
		local __registeredModules = self._registeredModules
		local _arg0 = function(v)
			return require(v)
		end
		for _k, _v in __registeredModules do
			_arg0(_v, _k - 1, __registeredModules)
		end
		table.clear(self._registeredModules)
		self._isActive = true
		setActiveHandler(self)
		self:_setupCharacterReplication()
		remotes._damageTaken:connect(function(CharacterId, Damage)
			local character = Character:GetCharacterFromId_TS(CharacterId)
			if character then
				character.DamageTaken:Fire({
					Damage = Damage,
					Source = nil,
				})
			end
		end)
		logMessage("Started Client successfully")
	end
	function Client:_setupCharacterReplication()
		local previousSize = 0
		local stateUpdated = function(State)
			-- ▼ ReadonlyMap.size ▼
			local _size = 0
			for _ in State.replication do
				_size += 1
			end
			-- ▲ ReadonlyMap.size ▲
			local amount = _size
			if previousSize == amount then
				return nil
			end
			local _replication = State.replication
			local _arg0 = function(Data, Id)
				if Character:GetCharacterFromInstance_TS(Data.instance) then
					return nil
				end
				Character.new(Data.instance, {
					flag = Flags.CanCreateCharacterClient,
					data = Id,
				})
			end
			for _k, _v in _replication do
				_arg0(_v, _k, _replication)
			end
			local _exp = Character:GetCharacterMap_TS()
			local _arg0_1 = function(Character, Id)
				local _replication_1 = State.replication
				local _arg0_2 = Character:GetId()
				if _replication_1[_arg0_2] ~= nil then
					return nil
				end
				Character:Destroy()
			end
			for _k, _v in _exp do
				_arg0_1(_v, _k, _exp)
			end
			previousSize = amount
		end
		rootProducer:subscribe(function(State)
			return stateUpdated(State)
		end)
		stateUpdated(rootProducer:getState())
	end
end
local function CreateClient(ApplyLoggerMiddleware)
	if ApplyLoggerMiddleware == nil then
		ApplyLoggerMiddleware = false
	end
	if RunService:IsServer() then
		logError("Attempted to instantiate Client handler on server side!")
	end
	if currentInstance then
		logWarning("Attempted to instantiate Client twice. \n Framework does not allow multiple Client instances!")
		return currentInstance
	end
	return Client.new(ApplyLoggerMiddleware)
end
return {
	CreateClient = CreateClient,
}
