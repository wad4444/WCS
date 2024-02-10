-- Compiled with roblox-ts v2.2.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- eslint-disable @typescript-eslint/no-explicit-any 
local Janitor = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "janitor", "src").Janitor
local _utility = TS.import(script, game:GetService("ReplicatedStorage"), "library", "source", "utility")
local freezeCheck = _utility.freezeCheck
local getActiveHandler = _utility.getActiveHandler
local isServerContext = _utility.isServerContext
local logError = _utility.logError
local logWarning = _utility.logWarning
local isClientContext = _utility.isClientContext
local Flags = TS.import(script, game:GetService("ReplicatedStorage"), "library", "source", "flags").Flags
local _timer = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "timer", "out")
local Timer = _timer.Timer
local TimerState = _timer.TimerState
local SelectStatusData = TS.import(script, game:GetService("ReplicatedStorage"), "library", "state", "selectors").SelectStatusData
local rootProducer = TS.import(script, game:GetService("ReplicatedStorage"), "library", "state", "rootProducer").rootProducer
local t = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "t", "lib", "ts").t
local Signal = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "signal")
local registeredStatuses = {}
local nextId = 0
local function generateId()
	nextId += if isServerContext() then 1 else -1
	return tostring(nextId)
end
--[[
	*
	 * A status effect class.
	 
]]
local StatusEffect
do
	StatusEffect = setmetatable({}, {
		__tostring = function()
			return "StatusEffect"
		end,
	})
	StatusEffect.__index = StatusEffect
	function StatusEffect.new(...)
		local self = setmetatable({}, StatusEffect)
		return self:constructor(...) or self
	end
	function StatusEffect:constructor(Props, ...)
		local Args = { ... }
		self.janitor = Janitor.new()
		self.MetadataChanged = Signal.new()
		self.StateChanged = Signal.new()
		self.HumanoidDataChanged = Signal.new()
		self.Destroyed = Signal.new()
		self.Started = Signal.new()
		self.Ended = Signal.new()
		self.DestroyOnEnd = true
		self.state = {
			IsActive = false,
			_isActive_counter = 0,
		}
		self.isDestroyed = false
		self.timer = Timer.new(1)
		local _binding = if tostring((getmetatable(Props))) ~= "Character" then Props else {
			Character = Props,
			Flag = nil,
		}
		local Character = _binding.Character
		local Flag = _binding.Flag
		self.id = if Flag and Flag.flag == Flags.CanAssignCustomId then Flag.data else generateId()
		self.Character = Character
		if not self.Character or tostring((getmetatable(self.Character))) ~= "Character" then
			logError("Not provided a valid character for StatusEffect constructor")
		end
		if not getActiveHandler() then
			logError("Attempted to instantiate a character before server has started.")
		end
		self.isReplicated = isClientContext() and tonumber(self.id) > 0
		self.ConstructorArguments = Args
		self.janitor:Add(self.StateChanged:Connect(function(New, Old)
			return self:stateDependentCallbacks(New, Old)
		end))
		self.janitor:Add(self.Ended:Connect(function()
			return self.DestroyOnEnd and self:Destroy()
		end))
		self.janitor:Add(self.timer.completed:Connect(function()
			self:End()
		end), "Disconnect")
		self.janitor:Add(function()
			self.StateChanged:Destroy()
			self.MetadataChanged:Destroy()
			self.HumanoidDataChanged:Destroy()
			self.Destroyed:Destroy()
			self.Started:Destroy()
			self.Ended:Destroy()
		end)
		Character:_addStatus(self)
		self:startReplicationClient()
		if isServerContext() then
			rootProducer.setStatusData(self.Character:GetId(), self.id, self:_packData())
		end
		self:OnConstruct(unpack(Args))
		if isServerContext() then
			self:OnConstructServer(unpack(Args))
		else
			self:OnConstructClient(unpack(Args))
		end
	end
	function StatusEffect:Start(Time)
		if self.isReplicated then
			return logWarning("Cannot perform this action on a replicated status")
		end
		if self.timer:getState() == TimerState.Running then
			return nil
		end
		if self.timer:getState() == TimerState.Paused then
			self.timer:resume()
			self.timer:stop()
		end
		self:SetState({
			IsActive = true,
		})
		if Time == nil or Time <= 0 then
			return nil
		end
		self.timer:setLength(Time)
		self.timer:start()
	end
	function StatusEffect:End()
		self:Stop()
	end
	function StatusEffect:Pause()
		if self.isReplicated then
			return logWarning("Cannot perform this action on a replicated status")
		end
		if self.timer:getState() ~= TimerState.Running then
			logWarning("Cannot pause a non active status effect")
			return nil
		end
		self.timer:pause()
	end
	function StatusEffect:Resume()
		if self.isReplicated then
			return logWarning("Cannot perform this action on a replicated status")
		end
		if self.timer:getState() ~= TimerState.Paused then
			logWarning("Cannot resume a non paused status effect")
			return nil
		end
		self.timer:resume()
	end
	function StatusEffect:Stop()
		if self.isReplicated then
			return logWarning("Cannot perform this action on a replicated status")
		end
		if not self:GetState().IsActive then
			logWarning("Cannot stop a non active status effect")
			return nil
		end
		self:SetState({
			IsActive = false,
		})
		if self.timer:getState() == TimerState.NotRunning then
			return nil
		end
		if self.timer:getState() == TimerState.Paused then
			self.timer:resume()
			self.timer:stop()
			return nil
		end
		self.timer:stop()
	end
	function StatusEffect:SetHumanoidData(Props, Priority)
		if Priority == nil then
			Priority = 1
		end
		local newData = {
			Props = Props,
			Priority = Priority,
		}
		self.HumanoidDataChanged:Fire(newData, self.humanoidData)
		self.humanoidData = newData
		if isServerContext() then
			rootProducer.patchStatusData(self.Character:GetId(), self.id, {
				humanoidData = self.humanoidData,
			})
		end
	end
	function StatusEffect:ClearHumanoidData()
		self.HumanoidDataChanged:Fire(nil, self.humanoidData)
		self.humanoidData = nil
		if isServerContext() then
			rootProducer.patchStatusData(self.Character:GetId(), self.id, {
				humanoidData = nil,
			})
		end
	end
	function StatusEffect:ClearMetadata()
		if self.isReplicated then
			logError("Cannot :ClearMetadata() of replicated status effect on client! \n This can lead to a possible desync")
		end
		self.MetadataChanged:Fire(nil, self.metadata)
		self.metadata = nil
		if isServerContext() then
			rootProducer.patchStatusData(self.Character:GetId(), self.id, {
				metadata = nil,
			})
		end
	end
	function StatusEffect:SetState(Patch)
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
			rootProducer.patchStatusData(self.Character:GetId(), self.id, {
				state = newState,
			})
		end
		self.StateChanged:Fire(newState, oldState)
	end
	function StatusEffect:SetMetadata(NewMeta)
		if self.isReplicated then
			logError("Cannot :SetMetadata() of replicated status effect on client! \n This can lead to a possible desync")
		end
		if t.table(NewMeta) then
			freezeCheck(NewMeta)
		end
		self.MetadataChanged:Fire(NewMeta, self.metadata)
		self.metadata = NewMeta
		if isServerContext() then
			rootProducer.patchStatusData(self.Character:GetId(), self.id, {
				metadata = NewMeta,
			})
		end
	end
	function StatusEffect:GetState()
		return self.state
	end
	function StatusEffect:GetHumanoidData()
		return self.humanoidData
	end
	function StatusEffect:GetMetadata()
		return self.metadata
	end
	function StatusEffect:IsDestroyed()
		return self.isDestroyed
	end
	function StatusEffect:GetId()
		return self.id
	end
	function StatusEffect:HandleDamage(Modified, Original)
		return Modified
	end
	function StatusEffect:Destroy()
		if isServerContext() then
			rootProducer.deleteStatusData(self.Character:GetId(), self.id)
		end
		self.isDestroyed = true
		self.Destroyed:Fire()
		self.janitor:Cleanup()
	end
	function StatusEffect:CreateDamageContainer(Damage)
		return {
			Damage = Damage,
			Source = self,
		}
	end
	function StatusEffect:_packData()
		return {
			className = tostring((getmetatable(self))),
			state = self.state,
			constructorArgs = self.ConstructorArguments,
		}
	end
	function StatusEffect:stateDependentCallbacks(State, PreviousState)
		if PreviousState.IsActive == State.IsActive then
			return nil
		end
		if not PreviousState.IsActive and State.IsActive then
			if isClientContext() then
				self:OnStartClient()
			else
				self:OnStartServer()
			end
			self.Started:Fire()
			local _condition = isServerContext()
			if _condition == nil then
				_condition = self:OnEndServer()
			end
		elseif PreviousState.IsActive and not State.IsActive then
			if isClientContext() then
				self:OnEndClient()
			else
				self:OnEndServer()
			end
			self.Ended:Fire()
		end
		if PreviousState.IsActive == self.state.IsActive and self.isReplicated then
			self:OnStartClient()
			self.Started:Fire()
			self:OnEndClient()
			self.Ended:Fire()
		end
	end
	function StatusEffect:_proccessDataUpdate(StatusData, PreviousData)
		if PreviousData == nil then
			PreviousData = self:_packData()
		end
		if not StatusData then
			return nil
		end
		if StatusData.state ~= PreviousData.state then
			freezeCheck(StatusData.state)
			self.state = StatusData.state
			self.StateChanged:Fire(StatusData.state, PreviousData.state)
		end
		if StatusData.metadata ~= PreviousData.metadata then
			if t.table(StatusData.metadata) then
				freezeCheck(StatusData.metadata)
			end
			self.metadata = StatusData.metadata
			self.MetadataChanged:Fire(StatusData.metadata, PreviousData.metadata)
		end
		if StatusData.humanoidData ~= PreviousData.humanoidData then
			if StatusData.humanoidData then
				freezeCheck(StatusData.humanoidData)
			end
			self.humanoidData = StatusData.humanoidData
			self.HumanoidDataChanged:Fire(StatusData.humanoidData, PreviousData.humanoidData)
		end
	end
	function StatusEffect:startReplicationClient()
		if not self.isReplicated then
			return nil
		end
		local dataSelector = SelectStatusData(self.Character:GetId(), self.id)
		local subscription = rootProducer:subscribe(dataSelector, function(...)
			local args = { ... }
			return self:_proccessDataUpdate(unpack(args))
		end)
		self:_proccessDataUpdate(dataSelector(rootProducer:getState()))
		self.janitor:Add(subscription)
	end
	function StatusEffect:OnConstruct(...)
		local Args = { ... }
	end
	function StatusEffect:OnConstructClient(...)
		local Args = { ... }
	end
	function StatusEffect:OnConstructServer(...)
		local Args = { ... }
	end
	function StatusEffect:OnStartServer()
	end
	function StatusEffect:OnStartClient()
	end
	function StatusEffect:OnEndClient()
	end
	function StatusEffect:OnEndServer()
	end
end
local function StatusEffectDecorator(Constructor)
	local name = tostring(Constructor)
	if registeredStatuses[name] ~= nil then
		logError("StatusEffect with name " .. (name .. " was already registered before"))
	end
	local _constructor = Constructor
	registeredStatuses[name] = _constructor
end
local function GetRegisteredStatusEffectConstructor(Name)
	local _name = Name
	return registeredStatuses[_name]
end
return {
	StatusEffectDecorator = StatusEffectDecorator,
	GetRegisteredStatusEffectConstructor = GetRegisteredStatusEffectConstructor,
	StatusEffect = StatusEffect,
}
