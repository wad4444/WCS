-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
-- eslint-disable @typescript-eslint/no-explicit-any 
local Janitor = TS.import(script, TS.getModule(script, "@rbxts", "janitor").src).Janitor
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local _utility = TS.import(script, script.Parent, "utility")
local freezeCheck = _utility.freezeCheck
local getActiveHandler = _utility.getActiveHandler
local logError = _utility.logError
local logWarning = _utility.logWarning
local Flags = TS.import(script, script.Parent, "flags").Flags
local _timer = TS.import(script, TS.getModule(script, "@rbxts", "timer").out)
local Timer = _timer.Timer
local TimerState = _timer.TimerState
local SelectStatusData = TS.import(script, script.Parent.Parent, "state", "selectors").SelectStatusData
local rootProducer = TS.import(script, script.Parent.Parent, "state", "rootProducer").rootProducer
local t = TS.import(script, TS.getModule(script, "@rbxts", "t").lib.ts).t
local Signal = TS.import(script, TS.getModule(script, "@rbxts", "signal"))
local registeredStatuses = {}
local nextId = 0
local function generateId()
	nextId += if RunService:IsServer() then 1 else -1
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
		self._janitor = Janitor.new()
		self.MetadataChanged = Signal.new()
		self.StateChanged = Signal.new()
		self.HumanoidDataChanged = Signal.new()
		self.Destroyed = Signal.new()
		self.Started = Signal.new()
		self.Ended = Signal.new()
		self.DestroyOnEnd = true
		self._state = {
			IsActive = false,
			_isActive_counter = 0,
		}
		self._isDestroyed = false
		self._timer = Timer.new(1)
		local _binding = if tostring((getmetatable(Props))) ~= "Character" then Props else {
			Character = Props,
			Flag = nil,
		}
		local Character = _binding.Character
		local Flag = _binding.Flag
		self._id = if Flag and Flag.flag == Flags.CanAssignCustomId then Flag.data else generateId()
		self.Character = Character
		if not self.Character or tostring((getmetatable(self.Character))) ~= "Character" then
			logError("Not provided a valid character for StatusEffect constructor")
		end
		if not getActiveHandler() then
			logError("Attempted to instantiate a character before server has started.")
		end
		self._isReplicated = RunService:IsClient() and tonumber(self._id) > 0
		self.ConstructorArguments = Args
		self._janitor:Add(self.StateChanged:Connect(function(New, Old)
			return self:_stateDependentCallbacks(New, Old)
		end))
		self._janitor:Add(self.Ended:Connect(function()
			return self.DestroyOnEnd and self:Destroy()
		end))
		self._janitor:Add(self._timer.completed:Connect(function()
			self:End()
		end), "Disconnect")
		self._janitor:Add(function()
			self.StateChanged:Destroy()
			self.MetadataChanged:Destroy()
			self.HumanoidDataChanged:Destroy()
			self.Destroyed:Destroy()
			self.Started:Destroy()
			self.Ended:Destroy()
		end)
		Character:_addStatus(self)
		self:_startReplicationClient()
		if RunService:IsServer() then
			rootProducer.setStatusData(self.Character:GetId(), self._id, self:_packData())
		end
		self:OnConstruct(unpack(Args))
		if RunService:IsServer() then
			self:OnConstructServer(unpack(Args))
		else
			self:OnConstructClient(unpack(Args))
		end
	end
	function StatusEffect:Start(Time)
		if self._isReplicated then
			return logWarning("Cannot perform this action on a replicated status")
		end
		if self._timer:getState() == TimerState.Running then
			return nil
		end
		if self._timer:getState() == TimerState.Paused then
			self._timer:resume()
			self._timer:stop()
		end
		self:SetState({
			IsActive = true,
		})
		if Time == nil or Time <= 0 then
			return nil
		end
		self._timer:setLength(Time)
		self._timer:start()
	end
	function StatusEffect:End()
		self:Stop()
	end
	function StatusEffect:Pause()
		if self._isReplicated then
			return logWarning("Cannot perform this action on a replicated status")
		end
		if self._timer:getState() ~= TimerState.Running then
			logWarning("Cannot pause a non active status effect")
			return nil
		end
		self._timer:pause()
	end
	function StatusEffect:Resume()
		if self._isReplicated then
			return logWarning("Cannot perform this action on a replicated status")
		end
		if self._timer:getState() ~= TimerState.Paused then
			logWarning("Cannot resume a non paused status effect")
			return nil
		end
		self._timer:resume()
	end
	function StatusEffect:Stop()
		if self._isReplicated then
			return logWarning("Cannot perform this action on a replicated status")
		end
		if not self:GetState().IsActive then
			logWarning("Cannot stop a non active status effect")
			return nil
		end
		self:SetState({
			IsActive = false,
		})
		if self._timer:getState() == TimerState.NotRunning then
			return nil
		end
		if self._timer:getState() == TimerState.Paused then
			self._timer:resume()
			self._timer:stop()
			return nil
		end
		self._timer:stop()
	end
	function StatusEffect:SetHumanoidData(Props, Priority)
		if Priority == nil then
			Priority = 1
		end
		local newData = {
			Props = Props,
			Priority = Priority,
		}
		self.HumanoidDataChanged:Fire(newData, self._humanoidData)
		self._humanoidData = newData
		if RunService:IsServer() then
			rootProducer.patchStatusData(self.Character:GetId(), self._id, {
				humanoidData = self._humanoidData,
			})
		end
	end
	function StatusEffect:ClearHumanoidData()
		self.HumanoidDataChanged:Fire(nil, self._humanoidData)
		self._humanoidData = nil
		if RunService:IsServer() then
			rootProducer.patchStatusData(self.Character:GetId(), self._id, {
				humanoidData = nil,
			})
		end
	end
	function StatusEffect:ClearMetadata()
		if self._isReplicated then
			logError("Cannot :ClearMetadata() of replicated status effect on client! \n This can lead to a possible desync")
		end
		self.MetadataChanged:Fire(nil, self._metadata)
		self._metadata = nil
		if RunService:IsServer() then
			rootProducer.patchStatusData(self.Character:GetId(), self._id, {
				metadata = nil,
			})
		end
	end
	function StatusEffect:SetState(Patch)
		if self._isReplicated then
			logError("Cannot :SetState() of replicated status effect on client! \n This can lead to a possible desync")
		end
		local _object = {}
		for _k, _v in self._state do
			_object[_k] = _v
		end
		for _k, _v in Patch do
			_object[_k] = _v
		end
		local newState = _object
		if Patch.IsActive ~= nil then
			newState._isActive_counter += 1
		end
		local oldState = self._state
		freezeCheck(newState)
		self._state = newState
		if RunService:IsServer() then
			rootProducer.patchStatusData(self.Character:GetId(), self._id, {
				state = newState,
			})
		end
		self.StateChanged:Fire(newState, oldState)
	end
	function StatusEffect:SetMetadata(NewMeta)
		if self._isReplicated then
			logError("Cannot :SetMetadata() of replicated status effect on client! \n This can lead to a possible desync")
		end
		if t.table(NewMeta) then
			freezeCheck(NewMeta)
		end
		self.MetadataChanged:Fire(NewMeta, self._metadata)
		self._metadata = NewMeta
		if RunService:IsServer() then
			rootProducer.patchStatusData(self.Character:GetId(), self._id, {
				metadata = NewMeta,
			})
		end
	end
	function StatusEffect:GetState()
		return self._state
	end
	function StatusEffect:GetHumanoidData()
		return self._humanoidData
	end
	function StatusEffect:GetMetadata()
		return self._metadata
	end
	function StatusEffect:IsDestroyed()
		return self._isDestroyed
	end
	function StatusEffect:GetId()
		return self._id
	end
	function StatusEffect:HandleDamage(Modified, Original)
		return Modified
	end
	function StatusEffect:Destroy()
		if RunService:IsServer() then
			rootProducer.deleteStatusData(self.Character:GetId(), self._id)
		end
		self._isDestroyed = true
		self.Destroyed:Fire()
		self._janitor:Cleanup()
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
			state = self._state,
			constructorArgs = self.ConstructorArguments,
		}
	end
	function StatusEffect:_stateDependentCallbacks(State, PreviousState)
		if PreviousState.IsActive == State.IsActive then
			return nil
		end
		if not PreviousState.IsActive and State.IsActive then
			if RunService:IsClient() then
				self:OnStartClient()
			else
				self:OnStartServer()
			end
			self.Started:Fire()
			local _condition = RunService:IsServer()
			if _condition == nil then
				_condition = self:OnEndServer()
			end
		elseif PreviousState.IsActive and not State.IsActive then
			if RunService:IsClient() then
				self:OnEndClient()
			else
				self:OnEndServer()
			end
			self.Ended:Fire()
		end
		if PreviousState.IsActive == self._state.IsActive and self._isReplicated then
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
			self._state = StatusData.state
			self.StateChanged:Fire(StatusData.state, PreviousData.state)
		end
		if StatusData.metadata ~= PreviousData.metadata then
			if t.table(StatusData.metadata) then
				freezeCheck(StatusData.metadata)
			end
			self._metadata = StatusData.metadata
			self.MetadataChanged:Fire(StatusData.metadata, PreviousData.metadata)
		end
		if StatusData.humanoidData ~= PreviousData.humanoidData then
			if StatusData.humanoidData then
				freezeCheck(StatusData.humanoidData)
			end
			self._humanoidData = StatusData.humanoidData
			self.HumanoidDataChanged:Fire(StatusData.humanoidData, PreviousData.humanoidData)
		end
	end
	function StatusEffect:_startReplicationClient()
		if not self._isReplicated then
			return nil
		end
		local dataSelector = SelectStatusData(self.Character:GetId(), self._id)
		local subscription = rootProducer:subscribe(dataSelector, function(...)
			local args = { ... }
			return self:_proccessDataUpdate(unpack(args))
		end)
		self:_proccessDataUpdate(dataSelector(rootProducer:getState()))
		self._janitor:Add(subscription)
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
