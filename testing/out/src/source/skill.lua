-- Compiled with roblox-ts v2.2.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- eslint-disable @typescript-eslint/no-explicit-any 
-- eslint-disable roblox-ts/no-array-pairs 
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Players
local Flags = TS.import(script, game:GetService("ReplicatedStorage"), "library", "source", "flags").Flags
local _utility = TS.import(script, game:GetService("ReplicatedStorage"), "library", "source", "utility")
local freezeCheck = _utility.freezeCheck
local getActiveHandler = _utility.getActiveHandler
local isClientContext = _utility.isClientContext
local isServerContext = _utility.isServerContext
local logError = _utility.logError
local logWarning = _utility.logWarning
local Janitor = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "janitor", "src").Janitor
local SelectSkillData = TS.import(script, game:GetService("ReplicatedStorage"), "library", "state", "selectors").SelectSkillData
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "library", "source", "remotes").remotes
local rootProducer = TS.import(script, game:GetService("ReplicatedStorage"), "library", "state", "rootProducer").rootProducer
local Signal = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "signal")
local _timer = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "timer", "out")
local Timer = _timer.Timer
local TimerState = _timer.TimerState
local t = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "t", "lib", "ts").t
local SkillType
do
	local _inverse = {}
	SkillType = setmetatable({}, {
		__index = _inverse,
	})
	SkillType.Default = "Default"
	_inverse.Default = "Default"
	SkillType.Holdable = "Holdable"
	_inverse.Holdable = "Holdable"
end
--* @hidden @internal 
--* @internal @hidden 
local registeredSkills = {}
--* @hidden @internal 
local SkillBase
do
	SkillBase = {}
	function SkillBase:constructor(Props, ...)
		local Args = { ... }
		self._janitor = Janitor.new()
		self.Janitor = Janitor.new()
		self.CooldownTimer = Timer.new(1)
		self.Started = Signal.new()
		self.Ended = Signal.new()
		self.StateChanged = Signal.new()
		self.Destroyed = Signal.new()
		self.MetadataChanged = Signal.new()
		self.CheckOthersActive = true
		self.MutualExclusives = {}
		self.Requirements = {}
		self.CheckClientState = true
		self.state = {
			_isActive_counter = 0,
			IsActive = false,
			Debounce = false,
		}
		self.destroyed = false
		self.Name = tostring((getmetatable(self)))
		self._skillType = SkillType.Default
		local _binding = if tostring((getmetatable(Props))) ~= "Character" then Props else {
			Character = Props,
			Flag = nil,
		}
		local Character = _binding.Character
		local Flag = _binding.Flag
		self.Character = Character
		if not self.Character or tostring((getmetatable(self.Character))) ~= "Character" then
			logError("Not provided a valid character for Skill constructor")
		end
		if not getActiveHandler() then
			logError("Attempted to instantiate a skill before server has started.")
		end
		if isClientContext() and Flag ~= Flags.CanInstantiateSkillClient then
			logError("Attempted to instantiate a skill on client")
		end
		self.Player = Players:GetPlayerFromCharacter(self.Character.Instance)
		self.ConstructorArguments = Args
		if isServerContext() then
			self._janitor:Add(remotes._messageToServer:connect(function(Player, CharacterId, SkillName, Message)
				if Player ~= self.Player then
					return nil
				end
				if SkillName ~= self.Name then
					return nil
				end
				if CharacterId ~= self.Character:GetId() then
					return nil
				end
				self:HandleClientMessage(Message)
			end))
		else
			self._janitor:Add(remotes._messageToClient:connect(function(CharacterId, SkillName, Message)
				if SkillName ~= self.Name then
					return nil
				end
				if CharacterId ~= self.Character:GetId() then
					return nil
				end
				self:HandleServerMessage(Message)
			end))
		end
		self._janitor:Add(self.CooldownTimer.completed:Connect(function()
			if not self:GetState().Debounce then
				return nil
			end
			self:SetState({
				Debounce = false,
			})
		end), "Disconnect")
		self._janitor:Add(function()
			self.StateChanged:Destroy()
			self.Destroyed:Destroy()
			self.Started:Destroy()
			self.Ended:Destroy()
			self.CooldownTimer:destroy()
			self.MetadataChanged:Destroy()
		end)
		self._janitor:Add(self.StateChanged:Connect(function(New, Old)
			return self:_stateDependentCallbacks(New, Old)
		end))
		self.isReplicated = isClientContext()
	end
	function SkillBase:_init()
		self.Character:_addSkill(self)
		self:startReplication()
		if not self.isReplicated then
			rootProducer.setSkillData(self.Character:GetId(), self.Name, self:packData())
		end
		local Args = self.ConstructorArguments
		self:OnConstruct(unpack(Args))
		if isServerContext() then
			self:OnConstructServer(unpack(Args))
		else
			self:OnConstructClient(unpack(Args))
		end
	end
	function SkillBase:Start(StarterParams)
		local state = self:GetState()
		if (state.IsActive or state.Debounce) and not (isClientContext() and not self.CheckClientState) then
			return nil
		end
		if isClientContext() then
			remotes._requestSkill:fire(self.Character:GetId(), self.Name, "Start", StarterParams)
			return nil
		end
		local activeEffects = self.Character:GetAllActiveStatusEffects()
		for _, Exclusive in pairs(self.MutualExclusives) do
			local _arg0 = function(T)
				return tostring((getmetatable(T))) == tostring(Exclusive)
			end
			-- ▼ ReadonlyArray.find ▼
			local _result
			for _i, _v in activeEffects do
				if _arg0(_v, _i - 1, activeEffects) == true then
					_result = _v
					break
				end
			end
			-- ▲ ReadonlyArray.find ▲
			if _result then
				return nil
			end
		end
		for _, Requirement in pairs(self.Requirements) do
			local _arg0 = function(T)
				return tostring((getmetatable(T))) == tostring(Requirement)
			end
			-- ▼ ReadonlyArray.find ▼
			local _result
			for _i, _v in activeEffects do
				if _arg0(_v, _i - 1, activeEffects) == true then
					_result = _v
					break
				end
			end
			-- ▲ ReadonlyArray.find ▲
			if not _result then
				return nil
			end
		end
		if self.CheckOthersActive and #self.Character:GetAllActiveSkills() > 0 then
			return nil
		end
		if not self:ShouldStart() then
			return nil
		end
		self:SetState({
			IsActive = true,
			StarterParams = StarterParams,
			Debounce = false,
		})
	end
	function SkillBase:IsDestroyed()
		return self.destroyed
	end
	function SkillBase:End()
		if isClientContext() then
			remotes._requestSkill:fire(self.Character:GetId(), self.Name, "End", nil)
			return nil
		end
		self:SetState({
			IsActive = false,
			StarterParams = nil,
		})
		self.Janitor:Cleanup()
	end
	function SkillBase:GetSkillType()
		return self._skillType
	end
	function SkillBase:Destroy()
		if isServerContext() then
			rootProducer.deleteSkillData(self.Character:GetId(), self.Name)
		end
		self.destroyed = true
		self.Destroyed:Fire()
		self._janitor:Cleanup()
	end
	function SkillBase:_stateDependentCallbacks(State, PreviousState)
		if PreviousState._isActive_counter == State._isActive_counter then
			return nil
		end
		if not PreviousState.IsActive and State.IsActive then
			if isClientContext() then
				self:OnStartClient(State.StarterParams)
			else
				self:OnStartServer(State.StarterParams)
			end
			self.Started:Fire()
			if isServerContext() then
				self:End()
			end
		elseif PreviousState.IsActive and not State.IsActive then
			if isClientContext() then
				self:OnEndClient()
			else
				self:OnEndServer()
			end
			self.Ended:Fire()
		end
		if PreviousState.IsActive == State.IsActive and self.isReplicated then
			self:OnStartClient(State.StarterParams)
			self.Started:Fire()
			self:OnEndClient()
			self.Ended:Fire()
		end
	end
	function SkillBase:GetState()
		return self.state
	end
	function SkillBase:GetName()
		return self.Name
	end
	function SkillBase:SetMetadata(NewMeta)
		if self.isReplicated then
			logError("Cannot :SetMetadata() of replicated status effect on client! \n This can lead to a possible desync")
		end
		if t.table(NewMeta) then
			freezeCheck(NewMeta)
		end
		self.MetadataChanged:Fire(NewMeta, self.metadata)
		self.metadata = NewMeta
		if isServerContext() then
			rootProducer.patchSkillData(self.Character:GetId(), self.Name, {
				metadata = NewMeta,
			})
		end
	end
	function SkillBase:GetMetadata()
		return self.metadata
	end
	function SkillBase:CreateDamageContainer(Damage)
		return {
			Damage = Damage,
			Source = self,
		}
	end
	function SkillBase:ApplyCooldown(Duration)
		if not isServerContext() then
			logWarning("Cannot :ApplyCooldown() on client.")
			return nil
		end
		self:SetState({
			Debounce = true,
		})
		if self.CooldownTimer:getState() == TimerState.Running then
			self.CooldownTimer:stop()
		end
		if self.CooldownTimer:getState() == TimerState.Paused then
			self.CooldownTimer:resume()
			self.CooldownTimer:stop()
		end
		self.CooldownTimer:setLength(Duration)
		self.CooldownTimer:start()
	end
	function SkillBase:SetState(Patch)
		if self.isReplicated then
			logError("Cannot :SetState() of replicated status effect on client! \n This can lead to a possible desync")
		end
		local _object = {}
		for _k, _v in self.state do
			_object[_k] = _v
		end
		for _k, _v in Patch do
			_object[_k] = _v
		end
		local newState = _object
		if Patch.IsActive ~= nil then
			newState._isActive_counter += 1
		end
		local oldState = self.state
		freezeCheck(newState)
		self.state = newState
		if isServerContext() then
			rootProducer.patchSkillData(self.Character:GetId(), self.Name, {
				state = newState,
			})
		end
		self.StateChanged:Fire(newState, oldState)
	end
	function SkillBase:ShouldStart()
		return true
	end
	function SkillBase:_proccessDataUpdate(NewData, OldData)
		if OldData == nil then
			OldData = self:packData()
		end
		if not NewData then
			return nil
		end
		if NewData.state ~= OldData.state then
			freezeCheck(NewData.state)
			self.state = NewData.state
			self.StateChanged:Fire(NewData.state, OldData.state)
		end
		if NewData.metadata ~= OldData.metadata then
			if t.table(NewData.metadata) then
				freezeCheck(NewData.metadata)
			end
			self.metadata = NewData.metadata
			self.MetadataChanged:Fire(NewData.metadata, OldData.metadata)
		end
	end
	function SkillBase:startReplication()
		if not self.isReplicated then
			return nil
		end
		local dataSelector = SelectSkillData(self.Character:GetId(), self.Name)
		self:_proccessDataUpdate(dataSelector(rootProducer:getState()))
		rootProducer:subscribe(dataSelector, function(...)
			local args = { ... }
			return self:_proccessDataUpdate(unpack(args))
		end)
	end
	function SkillBase:SendMessageToClient(Message)
		if not self.Player then
			return nil
		end
		if not isServerContext() then
			logWarning("Tried to send a message from client to client")
			return nil
		end
		remotes._messageToClient:fire(self.Player, self.Character:GetId(), self.Name, Message)
	end
	function SkillBase:SendMessageToServer(Message)
		if not self.Player then
			return nil
		end
		if not isClientContext() then
			logWarning("Tried to send a message from server to server")
			return nil
		end
		remotes._messageToServer:fire(self.Character:GetId(), self.Name, Message)
	end
	function SkillBase:packData()
		return {
			state = self.state,
			constructorArguments = self.ConstructorArguments,
			metadata = self.metadata,
		}
	end
	function SkillBase:OnConstruct(...)
		local Args = { ... }
	end
	function SkillBase:OnConstructClient(...)
		local Args = { ... }
	end
	function SkillBase:OnConstructServer(...)
		local Args = { ... }
	end
	function SkillBase:OnStartServer(StarterParams)
	end
	function SkillBase:OnStartClient(StarterParams)
	end
	function SkillBase:HandleClientMessage(Message)
	end
	function SkillBase:HandleServerMessage(Message)
	end
	function SkillBase:OnEndClient()
	end
	function SkillBase:OnEndServer()
	end
end
--* A skill class. 
local Skill
do
	local super = SkillBase
	Skill = setmetatable({}, {
		__tostring = function()
			return "Skill"
		end,
		__index = super,
	})
	Skill.__index = Skill
	function Skill:constructor(Character, ...)
		local Args = { ... }
		super.constructor(self, Character, unpack(Args))
		self:_init()
	end
end
--[[
	*
	 * A decorator function that registers a skill.
	 
]]
local function SkillDecorator(Constructor)
	local name = tostring(Constructor)
	if registeredSkills[name] ~= nil then
		logError("StatusEffect with name " .. (name .. " was already registered before"))
	end
	local _constructor = Constructor
	registeredSkills[name] = _constructor
end
--[[
	*
	 * Retrieves the constructor function of a registered skill by name.
	 
]]
local function GetRegisteredSkillConstructor(Name)
	local _name = Name
	return registeredSkills[_name]
end
return {
	SkillDecorator = SkillDecorator,
	GetRegisteredSkillConstructor = GetRegisteredSkillConstructor,
	SkillType = SkillType,
	SkillBase = SkillBase,
	Skill = Skill,
}
