-- Compiled with roblox-ts v2.2.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- eslint-disable @typescript-eslint/no-this-alias 
local createBroadcaster = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "reflex", "src").createBroadcaster
local t = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "t", "lib", "ts").t
local _utility = TS.import(script, game:GetService("ReplicatedStorage"), "library", "source", "utility")
local isClientContext = _utility.isClientContext
local logError = _utility.logError
local logMessage = _utility.logMessage
local logWarning = _utility.logWarning
local setActiveHandler = _utility.setActiveHandler
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "library", "source", "remotes").remotes
local slices = TS.import(script, game:GetService("ReplicatedStorage"), "library", "state", "slices").slices
local rootProducer = TS.import(script, game:GetService("ReplicatedStorage"), "library", "state", "rootProducer").rootProducer
local Character = TS.import(script, game:GetService("ReplicatedStorage"), "library", "source", "character").Character
local SelectCharacterData = TS.import(script, game:GetService("ReplicatedStorage"), "library", "state", "selectors").SelectCharacterData
local Immut = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "immut", "src")
local currentInstance = nil
local Server
do
	Server = setmetatable({}, {
		__tostring = function()
			return "Server"
		end,
	})
	Server.__index = Server
	function Server.new(...)
		local self = setmetatable({}, Server)
		return self:constructor(...) or self
	end
	function Server:constructor()
		self.FilterReplicatedCharacters = function(Player, Character)
			return Character.Instance == Player.Character
		end
		self.isActive = false
		self.registeredModules = {}
		currentInstance = self
		self.broadcaster = createBroadcaster({
			producers = slices,
			dispatch = function(Player, Actions)
				remotes._dispatch:fire(Player, Actions)
			end,
			beforeHydrate = function(Player, State)
				return Immut.produce(State, function(Draft)
					for Id, _ in State.replication do
						local character = Character:GetCharacterFromId_TS(Id)
						if not character then
							continue
						end
						if not self.FilterReplicatedCharacters(Player, character) then
							Draft.replication[Id] = nil
						end
					end
				end)
			end,
			beforeDispatch = function(Player, Action)
				if not t.string(Action.arguments[1]) then
					return Action
				end
				local character = Character:GetCharacterFromId_TS(Action.arguments[1])
				if not character then
					return Action
				end
				if not self.FilterReplicatedCharacters(Player, character) then
					return nil
				end
				return Action
			end,
		})
		rootProducer:applyMiddleware(self.broadcaster.middleware)
		remotes._start:connect(function(Player)
			return self.broadcaster:start(Player)
		end)
	end
	function Server:RegisterDirectory(Directory)
		if self.isActive then
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
			local _registeredModules = self.registeredModules
			local _descendant = Descendant
			table.insert(_registeredModules, _descendant)
		end
		for _k, _v in _exp do
			_arg0(_v, _k - 1, _exp)
		end
	end
	function Server:Start()
		if self.isActive then
			logWarning("Attempted to :Start() server twice!")
			return nil
		end
		local _registeredModules = self.registeredModules
		local _arg0 = function(v)
			return require(v)
		end
		for _k, _v in _registeredModules do
			_arg0(_v, _k - 1, _registeredModules)
		end
		table.clear(self.registeredModules)
		remotes._requestSkill:connect(function(Player, CharacterId, SkillName, Action, Params)
			local characterData = SelectCharacterData(CharacterId)(rootProducer:getState())
			if not characterData then
				return nil
			end
			local character = Character:GetCharacterFromInstance_TS(characterData.instance)
			if not character or character.Player ~= Player then
				return nil
			end
			local skill = character:GetSkillFromString(SkillName)
			if not skill then
				return nil
			end
			if Action == "Start" then
				skill:Start(Params)
			else
				skill:End()
			end
		end)
		setActiveHandler(self)
		self.isActive = true
		logMessage("Started Server successfully")
	end
	function Server:IsActive()
		return self.isActive
	end
end
local function CreateServer()
	if isClientContext() then
		logError("Attempted to instantiate server handler on client side!")
	end
	if currentInstance then
		logWarning("Attempted to instantiate server twice. \n Framework does not allow multiple server instances!")
		return currentInstance
	end
	return Server.new()
end
return {
	CreateServer = CreateServer,
}
