-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Players = _services.Players
local RunService = _services.RunService
local _utility = TS.import(script, script.Parent, "utility")
local getActiveHandler = _utility.getActiveHandler
local logError = _utility.logError
local logWarning = _utility.logWarning
local mapToArray = _utility.mapToArray
local Janitor = TS.import(script, TS.getModule(script, "@rbxts", "janitor").src).Janitor
local SelectCharacterData = TS.import(script, script.Parent.Parent, "state", "selectors").SelectCharacterData
local GetRegisteredStatusEffectConstructor = TS.import(script, script.Parent, "statusEffect").GetRegisteredStatusEffectConstructor
local Flags = TS.import(script, script.Parent, "flags").Flags
local GetRegisteredSkillConstructor = TS.import(script, script.Parent, "skill").GetRegisteredSkillConstructor
local rootProducer = TS.import(script, script.Parent.Parent, "state", "rootProducer").rootProducer
local remotes = TS.import(script, script.Parent, "remotes").remotes
local GetMovesetObjectByName = TS.import(script, script.Parent, "moveset").GetMovesetObjectByName
local Signal = TS.import(script, TS.getModule(script, "@rbxts", "signal"))
local nextId = 0
local function generateId()
	if RunService:IsClient() then
		logError("Why are you trying to call this on client?")
	end
	nextId += 1
	return tostring(nextId)
end
local Character
do
	Character = setmetatable({}, {
		__tostring = function()
			return "Character"
		end,
	})
	Character.__index = Character
	function Character.new(...)
		local self = setmetatable({}, Character)
		return self:constructor(...) or self
	end
	function Character:constructor(Instance, canCreateClient)
		self._janitor = Janitor.new()
		self.StatusEffectAdded = Signal.new()
		self.StatusEffectRemoved = Signal.new()
		self.HumanoidPropertiesUpdated = Signal.new()
		self.DamageTaken = Signal.new()
		self.Destroyed = Signal.new()
		self.MovesetChanged = Signal.new()
		self._statusEffects = {}
		self._skills = {}
		self._defaultsProps = {
			WalkSpeed = 16,
			JumpPower = 50,
			AutoRotate = true,
			JumpHeight = 7.2,
		}
		local _condition = RunService:IsClient()
		if _condition then
			local _result = canCreateClient
			if _result ~= nil then
				_result = _result.flag
			end
			_condition = _result ~= Flags.CanCreateCharacterClient
		end
		if _condition then
			logError("Attempted to manually create a character on client. \n On client side character are created by the handler automatically, \n doing this manually can lead to a possible desync")
		end
		local __currentCharMap = Character._currentCharMap
		local _instance = Instance
		if __currentCharMap[_instance] then
			logError("Attempted to create 2 different characters over a same instance.")
		end
		if not getActiveHandler() then
			logError("Attempted to instantiate a character before server has started.")
		end
		local humanoid = Instance:FindFirstChildOfClass("Humanoid")
		if not humanoid then
			logError("Attempted to instantiate a character over an instance without humanoid.")
			error("")
		end
		self.Instance = Instance
		self.Humanoid = humanoid
		self.Player = Players:GetPlayerFromCharacter(self.Instance)
		local _result = canCreateClient
		if _result ~= nil then
			_result = _result.data
		end
		local _condition_1 = _result
		if not (_condition_1 ~= "" and _condition_1) then
			_condition_1 = generateId()
		end
		self._id = _condition_1
		local __currentCharMap_1 = Character._currentCharMap
		local _instance_1 = Instance
		local _self = self
		__currentCharMap_1[_instance_1] = _self
		Character.CharacterCreated:Fire(self)
		self:_setupReplication_Client()
		self._janitor:Add(self.StatusEffectAdded:Connect(function()
			return self:_updateHumanoidProps()
		end))
		self._janitor:Add(self.StatusEffectRemoved:Connect(function()
			return self:_updateHumanoidProps()
		end))
		self._janitor:Add(function()
			self.StatusEffectAdded:Destroy()
			self.StatusEffectRemoved:Destroy()
			self.HumanoidPropertiesUpdated:Destroy()
		end)
		if RunService:IsServer() then
			rootProducer.setCharacterData(self._id, self:_packData())
			local server = getActiveHandler()
			self._janitor:Add(self.DamageTaken:Connect(function(Container)
				local _exp = Players:GetPlayers()
				local _arg0 = function(Player)
					if not server.FilterReplicatedCharacters(Player, self) then
						return nil
					end
					remotes._damageTaken:fire(Player, self._id, Container.Damage)
				end
				for _k, _v in _exp do
					_arg0(_v, _k - 1, _exp)
				end
			end))
		end
	end
	function Character:GetId()
		return self._id
	end
	function Character:Destroy()
		local __currentCharMap = Character._currentCharMap
		local _instance = self.Instance
		__currentCharMap[_instance] = nil
		if RunService:IsServer() then
			rootProducer.deleteCharacterData(self._id)
		end
		Character.CharacterDestroyed:Fire(self)
		local __skills = self._skills
		local _arg0 = function(Skill)
			return Skill:Destroy()
		end
		for _k, _v in __skills do
			_arg0(_v, _k, __skills)
		end
		local __statusEffects = self._statusEffects
		local _arg0_1 = function(Status)
			return Status:Destroy()
		end
		for _k, _v in __statusEffects do
			_arg0_1(_v, _k, __statusEffects)
		end
		self.Destroyed:Fire()
		self._janitor:Cleanup()
	end
	function Character:TakeDamage(Container)
		if RunService:IsClient() then
			logWarning("Cannot use :TakeDamage() on client")
			return nil
		end
		local originalDamage = Container.Damage
		local modifiedDamage = originalDamage
		local __statusEffects = self._statusEffects
		local _arg0 = function(Status)
			modifiedDamage = Status:HandleDamage(modifiedDamage, originalDamage)
		end
		for _k, _v in __statusEffects do
			_arg0(_v, _k, __statusEffects)
		end
		local _object = {}
		for _k, _v in Container do
			_object[_k] = _v
		end
		_object.Damage = modifiedDamage
		local container = _object
		self.DamageTaken:Fire(container)
		return container
	end
	function Character:PredictDamage(Container)
		if RunService:IsClient() then
			logWarning("Cannot use :TakeDamage() on client")
			return nil
		end
		local originalDamage = Container.Damage
		local modifiedDamage = originalDamage
		local __statusEffects = self._statusEffects
		local _arg0 = function(Status)
			modifiedDamage = Status:HandleDamage(modifiedDamage, originalDamage)
		end
		for _k, _v in __statusEffects do
			_arg0(_v, _k, __statusEffects)
		end
		local _object = {}
		for _k, _v in Container do
			_object[_k] = _v
		end
		_object.Damage = modifiedDamage
		local container = _object
		return container
	end
	function Character:_addStatus(Status)
		local __statusEffects = self._statusEffects
		local _arg0 = Status:GetId()
		local _status = Status
		__statusEffects[_arg0] = _status
		self.StatusEffectAdded:Fire(Status)
		Status.HumanoidDataChanged:Connect(function()
			return self:_updateHumanoidProps()
		end)
		Status.StateChanged:Connect(function()
			self:_updateHumanoidProps()
		end)
		Status.Destroyed:Connect(function()
			local __statusEffects_1 = self._statusEffects
			local _arg0_1 = Status:GetId()
			__statusEffects_1[_arg0_1] = nil
			self.StatusEffectRemoved:Fire(Status)
			self:_updateHumanoidProps()
		end)
	end
	function Character:_addSkill(Skill)
		local name = Skill:GetName()
		if self._skills[name] ~= nil then
			logError("Skill with name " .. (name .. (" is already registered for character " .. tostring(self.Instance))))
		end
		local __skills = self._skills
		local _skill = Skill
		__skills[name] = _skill
		Skill.Destroyed:Once(function()
			self._skills[name] = nil
		end)
	end
	function Character:_packData()
		local packedStatusEffect = {}
		local __statusEffects = self._statusEffects
		local _arg0 = function(Status, Id)
			local _id = Id
			local _arg1 = Status:_packData()
			packedStatusEffect[_id] = _arg1
			return packedStatusEffect
		end
		for _k, _v in __statusEffects do
			_arg0(_v, _k, __statusEffects)
		end
		return {
			instance = self.Instance,
			statusEffects = packedStatusEffect,
			defaultProps = self._defaultsProps,
			moveset = self._moveset,
			skills = {},
		}
	end
	function Character:SetDefaultProps(Props)
		self._defaultsProps = Props
		if RunService:IsServer() then
			rootProducer.patchCharacterData(self._id, {
				defaultProps = Props,
			})
		end
	end
	function Character:GetDefaultsProps()
		return table.clone(self._defaultsProps)
	end
	function Character:GetCharacterMap_TS()
		return table.clone(Character._currentCharMap)
	end
	function Character:GetCharacterFromId_TS(Id)
		for _, Character in pairs(self._currentCharMap) do
			if Character:GetId() == Id then
				return Character
			end
		end
	end
	function Character:GetCharacterFromInstance_TS(Instance)
		local __currentCharMap = Character._currentCharMap
		local _instance = Instance
		return __currentCharMap[_instance]
	end
	function Character.GetCharacterMap()
		return table.clone(Character._currentCharMap)
	end
	function Character.GetCharacterFromInstance(Instance)
		local __currentCharMap = Character._currentCharMap
		local _instance = Instance
		return __currentCharMap[_instance]
	end
	function Character:GetAllStatusEffects()
		return mapToArray(self._statusEffects)
	end
	function Character:GetAllActiveStatusEffects()
		local _exp = mapToArray(self._statusEffects)
		local _arg0 = function(T)
			return T:GetState().IsActive
		end
		-- ▼ ReadonlyArray.filter ▼
		local _newValue = {}
		local _length = 0
		for _k, _v in _exp do
			if _arg0(_v, _k - 1, _exp) == true then
				_length += 1
				_newValue[_length] = _v
			end
		end
		-- ▲ ReadonlyArray.filter ▲
		return _newValue
	end
	function Character:GetAllStatusEffectsOfType(Constructor)
		local _exp = mapToArray(self._statusEffects)
		local _arg0 = function(T)
			return tostring((getmetatable(T))) == tostring(Constructor)
		end
		-- ▼ ReadonlyArray.filter ▼
		local _newValue = {}
		local _length = 0
		for _k, _v in _exp do
			if _arg0(_v, _k - 1, _exp) == true then
				_length += 1
				_newValue[_length] = _v
			end
		end
		-- ▲ ReadonlyArray.filter ▲
		return _newValue
	end
	function Character:GetAllActiveStatusEffectsOfType(Constructor)
		local _exp = mapToArray(self._statusEffects)
		local _arg0 = function(T)
			return tostring((getmetatable(T))) == tostring(Constructor) and T:GetState().IsActive
		end
		-- ▼ ReadonlyArray.filter ▼
		local _newValue = {}
		local _length = 0
		for _k, _v in _exp do
			if _arg0(_v, _k - 1, _exp) == true then
				_length += 1
				_newValue[_length] = _v
			end
		end
		-- ▲ ReadonlyArray.filter ▲
		return _newValue
	end
	function Character:HasStatusEffects(Constructors)
		for _, Effect in pairs(self._statusEffects) do
			if not Effect:GetState().IsActive then
				continue
			end
			local _constructors = Constructors
			local _arg0 = function(T)
				return tostring(T) == tostring((getmetatable(Effect)))
			end
			-- ▼ ReadonlyArray.find ▼
			local _result
			for _i, _v in _constructors do
				if _arg0(_v, _i - 1, _constructors) == true then
					_result = _v
					break
				end
			end
			-- ▲ ReadonlyArray.find ▲
			if _result then
				return true
			end
		end
		return false
	end
	function Character:GetSkills()
		return mapToArray(self._skills)
	end
	function Character:GetAllActiveSkills()
		local _exp = mapToArray(self._skills)
		local _arg0 = function(T)
			return T:GetState().IsActive
		end
		-- ▼ ReadonlyArray.filter ▼
		local _newValue = {}
		local _length = 0
		for _k, _v in _exp do
			if _arg0(_v, _k - 1, _exp) == true then
				_length += 1
				_newValue[_length] = _v
			end
		end
		-- ▲ ReadonlyArray.filter ▲
		return _newValue
	end
	function Character:GetSkillFromString(Name)
		local __skills = self._skills
		local _name = Name
		return __skills[_name]
	end
	function Character:GetSkillFromConstructor(Constructor)
		local __skills = self._skills
		local _arg0 = tostring(Constructor)
		return __skills[_arg0]
	end
	function Character:ApplyMoveset(Moveset)
		if not RunService:IsServer() then
			logWarning("Attempted to apply moveset on client")
			return nil
		end
		local _moveset = Moveset
		local movesetObject = if type(_moveset) == "string" then GetMovesetObjectByName(Moveset) else Moveset
		if not movesetObject then
			logError("The provided moveset is invalid")
		end
		local _value = self._moveset
		if _value ~= "" and _value then
			local _skills = movesetObject.Skills
			local _arg0 = function(SkillConstructor)
				local name = tostring(SkillConstructor)
				local _result = self._skills[name]
				if _result ~= nil then
					_result:Destroy()
				end
			end
			for _k, _v in _skills do
				_arg0(_v, _k - 1, _skills)
			end
		end
		local _skills = movesetObject.Skills
		local _arg0 = function(SkillConstructor)
			local name = tostring(SkillConstructor)
			local _result = self._skills[name]
			if _result ~= nil then
				_result:Destroy()
			end
			SkillConstructor.new(self)
		end
		for _k, _v in _skills do
			_arg0(_v, _k - 1, _skills)
		end
		local oldMoveset = self._moveset
		self._moveset = movesetObject.Name
		self.MovesetChanged:Fire(movesetObject.Name, oldMoveset)
		rootProducer.patchCharacterData(self._id, {
			moveset = self._moveset,
		})
	end
	function Character:GetMoveset()
		return self._moveset
	end
	function Character:GetMovesetSkills(Moveset)
		if Moveset == nil then
			Moveset = self._moveset
		end
		if not (Moveset ~= "" and Moveset) then
			return nil
		end
		local movesetObject = GetMovesetObjectByName(Moveset)
		if not movesetObject then
			return nil
		end
		local skills = {}
		local __skills = self._skills
		local _arg0 = function(Skill)
			local _skills = movesetObject.Skills
			local _arg0_1 = function(T)
				return tostring(T) == tostring((getmetatable(Skill)))
			end
			-- ▼ ReadonlyArray.find ▼
			local _result
			for _i, _v in _skills do
				if _arg0_1(_v, _i - 1, _skills) == true then
					_result = _v
					break
				end
			end
			-- ▲ ReadonlyArray.find ▲
			if _result then
				local _skill = Skill
				table.insert(skills, _skill)
			end
		end
		for _k, _v in __skills do
			_arg0(_v, _k, __skills)
		end
		return skills
	end
	function Character:ClearMoveset()
		if not RunService:IsServer() then
			logError("Attempted to clear moveset on client")
		end
		local _value = self._moveset
		if not (_value ~= "" and _value) then
			return nil
		end
		local movesetObject = GetMovesetObjectByName(self._moveset)
		if not movesetObject then
			return nil
		end
		local _skills = movesetObject.Skills
		local _arg0 = function(SkillConstructor)
			local name = tostring(SkillConstructor)
			local _result = self._skills[name]
			if _result ~= nil then
				_result:Destroy()
			end
		end
		for _k, _v in _skills do
			_arg0(_v, _k - 1, _skills)
		end
		local oldMoveset = self._moveset
		self._moveset = nil
		self.MovesetChanged:Fire(self._moveset, oldMoveset)
	end
	function Character:ApplySkillsFromMoveset(Moveset)
		local _skills = Moveset.Skills
		local _arg0 = function(SkillConstructor)
			local name = tostring(SkillConstructor)
			local _result = self._skills[name]
			if _result ~= nil then
				_result:Destroy()
			end
			SkillConstructor.new(self)
		end
		for _k, _v in _skills do
			_arg0(_v, _k - 1, _skills)
		end
	end
	function Character:_setupReplication_Client()
		if not RunService:IsClient() then
			return nil
		end
		if not getActiveHandler() then
			return nil
		end
		local processStatusAddition = function(Data, Id)
			local constructor = GetRegisteredStatusEffectConstructor(Data.className)
			if not constructor then
				logError("Replication Error: Could not find a registered StatusEffect with name " .. (Data.className .. ". \n Try doing :RegisterDirectory() on the file directory."))
			end
			constructor.new({
				Character = self,
				Flag = {
					flag = Flags.CanAssignCustomId,
					data = Id,
				},
			}, unpack((Data.constructorArgs)))
		end
		local proccessMovesetChange = function(New, Old)
			self._moveset = New
			self.MovesetChanged:Fire(New, Old)
		end
		local proccessSkillAddition = function(Data, Name)
			local constructor = GetRegisteredSkillConstructor(Name)
			if not constructor then
				logError("Replication Error: Could not find a registered Skill with name " .. (Name .. ". \n Try doing :RegisterDirectory() on the file directory."))
			end
			constructor.new({
				Character = self,
				Flag = Flags.CanInstantiateSkillClient,
			}, unpack((Data.constructorArguments)))
		end
		local proccessDataUpdate = function(CharacterData)
			if not CharacterData then
				return nil
			end
			local _statusEffects = CharacterData.statusEffects
			local _arg0 = function(StatusData, Id)
				local __statusEffects = self._statusEffects
				local _id = Id
				if not (__statusEffects[_id] ~= nil) then
					processStatusAddition(StatusData, Id)
				end
			end
			for _k, _v in _statusEffects do
				_arg0(_v, _k, _statusEffects)
			end
			local __statusEffects = self._statusEffects
			local _arg0_1 = function(Status, Id)
				local _statusEffects_1 = CharacterData.statusEffects
				local _id = Id
				local _condition = not (_statusEffects_1[_id] ~= nil)
				if _condition then
					_condition = tonumber(Id) > 0
				end
				if _condition then
					Status:Destroy()
					self.StatusEffectRemoved:Fire(Status)
				end
			end
			for _k, _v in __statusEffects do
				_arg0_1(_v, _k, __statusEffects)
			end
			local _skills = CharacterData.skills
			local _arg0_2 = function(SkillData, Name)
				local __skills = self._skills
				local _name = Name
				if not (__skills[_name] ~= nil) then
					proccessSkillAddition(SkillData, Name)
				end
			end
			for _k, _v in _skills do
				_arg0_2(_v, _k, _skills)
			end
			local __skills = self._skills
			local _arg0_3 = function(Skill, Name)
				local _skills_1 = CharacterData.skills
				local _name = Name
				if not (_skills_1[_name] ~= nil) then
					Skill:Destroy()
				end
			end
			for _k, _v in __skills do
				_arg0_3(_v, _k, __skills)
			end
			if CharacterData.moveset ~= self._moveset then
				proccessMovesetChange(CharacterData.moveset, self._moveset)
			end
			if CharacterData.defaultProps ~= self._defaultsProps then
				self:SetDefaultProps(CharacterData.defaultProps)
			end
		end
		local dataSelector = SelectCharacterData(self:GetId())
		local disconnect = rootProducer:subscribe(dataSelector, proccessDataUpdate)
		proccessDataUpdate(dataSelector(rootProducer:getState()))
		self._janitor:Add(disconnect)
		self:_updateHumanoidProps()
	end
	function Character:_updateHumanoidProps()
		if RunService:IsServer() and self.Player then
			return nil
		end
		local statuses = {}
		local __statusEffects = self._statusEffects
		local _arg0 = function(Status)
			if Status:GetHumanoidData() and Status:GetState().IsActive then
				local _status = Status
				table.insert(statuses, _status)
			end
		end
		for _k, _v in __statusEffects do
			_arg0(_v, _k, __statusEffects)
		end
		local propsToApply = self:GetDefaultsProps()
		local incPriorityList = {
			WalkSpeed = 0,
			JumpPower = 0,
			AutoRotate = 0,
			JumpHeight = 0,
		}
		local _arg0_1 = function(StatusEffect)
			local humanoidData = StatusEffect:GetHumanoidData()
			if not humanoidData then
				return nil
			end
			local priority = humanoidData.Priority
			for PropertyName, PropertyData in pairs(humanoidData.Props) do
				if PropertyData[2] == "Increment" then
					propsToApply[PropertyName] = (PropertyData[1] + propsToApply[PropertyName])
				elseif priority > incPriorityList[PropertyName] then
					propsToApply[PropertyName] = PropertyData[1]
					incPriorityList[PropertyName] = priority
				end
			end
		end
		for _k, _v in statuses do
			_arg0_1(_v, _k - 1, statuses)
		end
		self.HumanoidPropertiesUpdated:Fire(propsToApply)
		for PropertyName, Value in pairs(propsToApply) do
			self.Humanoid[PropertyName] = Value
		end
	end
	Character._currentCharMap = {}
	Character.CharacterCreated = Signal.new()
	Character.CharacterDestroyed = Signal.new()
end
return {
	Character = Character,
}
