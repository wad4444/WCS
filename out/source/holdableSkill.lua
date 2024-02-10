-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
-- eslint-disable roblox-ts/no-array-pairs 
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local _skill = TS.import(script, script.Parent, "skill")
local Skill = _skill.Skill
local SkillType = _skill.SkillType
local _timer = TS.import(script, TS.getModule(script, "@rbxts", "timer").out)
local Timer = _timer.Timer
local TimerState = _timer.TimerState
local logError = TS.import(script, script.Parent, "utility").logError
-- eslint-disable-next-line @typescript-eslint/no-explicit-any
local HoldableSkill
do
	local super = Skill
	HoldableSkill = setmetatable({}, {
		__tostring = function()
			return "HoldableSkill"
		end,
		__index = super,
	})
	HoldableSkill.__index = HoldableSkill
	function HoldableSkill:constructor(Props)
		super.constructor(self, Props)
		self.HoldTimer = Timer.new(10)
		self._skillType = SkillType.Holdable
		if RunService:IsServer() then
			self._janitor:Add(self.HoldTimer.completed:Connect(function()
				return self:GetState().IsActive and self:End()
			end), "Disconnect")
		end
		self:_init()
	end
	function HoldableSkill:_stateDependentCallbacks(State, PreviousState)
		if PreviousState._isActive_counter == State._isActive_counter then
			return nil
		end
		if not PreviousState.IsActive and State.IsActive then
			if self:GetState().MaxHoldTime ~= nil then
				self.HoldTimer:start()
			end
			if RunService:IsClient() then
				self:OnStartClient(State.StarterParams)
			else
				self:OnStartServer(State.StarterParams)
			end
			self.Started:Fire()
		elseif PreviousState.IsActive and not State.IsActive then
			if self.HoldTimer:getState() == TimerState.Running then
				self.HoldTimer:stop()
			end
			if RunService:IsClient() then
				self:OnEndClient()
			else
				self:OnEndServer()
			end
			self.Ended:Fire()
		end
		if State.MaxHoldTime ~= PreviousState.MaxHoldTime then
			local _value = State.MaxHoldTime
			if _value ~= 0 and (_value == _value and _value) then
				self.HoldTimer:setLength(State.MaxHoldTime)
			end
		end
		if PreviousState.IsActive == State.IsActive and self.isReplicated then
			self:OnStartClient(State.StarterParams)
			self.Started:Fire()
			self:OnEndClient()
			self.Ended:Fire()
		end
	end
	function HoldableSkill:SetMaxHoldTime(MaxHoldTime)
		local _condition = MaxHoldTime
		if _condition ~= 0 and (_condition == _condition and _condition) then
			_condition = MaxHoldTime <= 0
		end
		if _condition ~= 0 and (_condition == _condition and _condition) then
			logError("Max Hold Time can't be lower or equal to zero")
		end
		self:SetState({
			MaxHoldTime = MaxHoldTime,
		})
		if MaxHoldTime ~= 0 and (MaxHoldTime == MaxHoldTime and MaxHoldTime) then
			self.HoldTimer:setLength(MaxHoldTime)
		end
	end
	function HoldableSkill:GetMaxHoldTime()
		return self:GetState().MaxHoldTime
	end
end
return {
	HoldableSkill = HoldableSkill,
}
