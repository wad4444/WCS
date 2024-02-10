-- Compiled with roblox-ts v2.2.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Players
local _utility = TS.import(script, game:GetService("ReplicatedStorage"), "library", "source", "utility")
local getActiveHandler = _utility.getActiveHandler
local isClientContext = _utility.isClientContext
local isServerContext = _utility.isServerContext
local logError = _utility.logError
local logWarning = _utility.logWarning
local mapToArray = _utility.mapToArray
local Janitor = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "janitor", "src").Janitor
local SelectCharacterData = TS.import(script, game:GetService("ReplicatedStorage"), "library", "state", "selectors").SelectCharacterData
local GetRegisteredStatusEffectConstructor = TS.import(script, game:GetService("ReplicatedStorage"), "library", "source", "statusEffect").GetRegisteredStatusEffectConstructor
local Flags = TS.import(script, game:GetService("ReplicatedStorage"), "library", "source", "flags").Flags
local GetRegisteredSkillConstructor = TS.import(script, game:GetService("ReplicatedStorage"), "library", "source", "skill").GetRegisteredSkillConstructor
local rootProducer = TS.import(script, game:GetService("ReplicatedStorage"), "library", "state", "rootProducer").rootProducer
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "library", "source", "remotes").remotes
local GetMovesetObjectByName = TS.import(script, game:GetService("ReplicatedStorage"), "library", "source", "moveset").GetMovesetObjectByName
local Signal = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "signal")
local nextId = 0
local function generateId()
	if isClientContext() then
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
		self.janitor = Janitor.new()
		self.StatusEffectAdded = Signal.new()
		self.StatusEffectRemoved = Signal.new()
		self.HumanoidPropertiesUpdated = Signal.new()
		self.DamageTaken = Signal.new()
		self.Destroyed = Signal.new()
		self.MovesetChanged = Signal.new()
		self.statusEffects = {}
		self.skills = {}
		self.defaultsProps = {
			WalkSpeed = 16,
			JumpPower = 50,
			AutoRotate = true,
			JumpHeight = 7.2,
		}
		self.destroyed = false
		local _condition = isClientContext()
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
		local _currentCharMap = Character.currentCharMap
		local _instance = Instance
		if _currentCharMap[_instance] then
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
		self.id = _condition_1
		local _currentCharMap_1 = Character.currentCharMap
		local _instance_1 = Instance
		local _self = self
		_currentCharMap_1[_instance_1] = _self
		Character.CharacterCreated:Fire(self)
		self:setupReplication_Client()
		self.janitor:Add(self.StatusEffectAdded:Connect(function()
			return self:updateHumanoidProps()
		end))
		self.janitor:Add(self.StatusEffectRemoved:Connect(function()
			return self:updateHumanoidProps()
		end))
		self.janitor:Add(function()
			self.StatusEffectAdded:Destroy()
			self.StatusEffectRemoved:Destroy()
			self.HumanoidPropertiesUpdated:Destroy()
		end)
		if isServerContext() then
			rootProducer.setCharacterData(self.id, self:_packData())
			local server = getActiveHandler()
			self.janitor:Add(self.DamageTaken:Connect(function(Container)
				local _exp = Players:GetPlayers()
				local _arg0 = function(Player)
					if not server.FilterReplicatedCharacters(Player, self) then
						return nil
					end
					remotes._damageTaken:fire(Player, self.id, Container.Damage)
				end
				for _k, _v in _exp do
					_arg0(_v, _k - 1, _exp)
				end
			end))
		end
	end
	function Character:GetId()
		return self.id
	end
	function Character:Destroy()
		local _currentCharMap = Character.currentCharMap
		local _instance = self.Instance
		_currentCharMap[_instance] = nil
		if isServerContext() then
			rootProducer.deleteCharacterData(self.id)
		end
		Character.CharacterDestroyed:Fire(self)
		local _skills = self.skills
		local _arg0 = function(Skill)
			return Skill:Destroy()
		end
		for _k, _v in _skills do
			_arg0(_v, _k, _skills)
		end
		local _statusEffects = self.statusEffects
		local _arg0_1 = function(Status)
			return Status:Destroy()
		end
		for _k, _v in _statusEffects do
			_arg0_1(_v, _k, _statusEffects)
		end
		self.Destroyed:Fire()
		self.janitor:Cleanup()
		self.destroyed = true
	end
	function Character:IsDestroyed()
		return self.destroyed
	end
	function Character:TakeDamage(Container)
		if isClientContext() then
			logWarning("Cannot use :TakeDamage() on client")
			return nil
		end
		local originalDamage = Container.Damage
		local modifiedDamage = originalDamage
		local _statusEffects = self.statusEffects
		local _arg0 = function(Status)
			modifiedDamage = Status:HandleDamage(modifiedDamage, originalDamage)
		end
		for _k, _v in _statusEffects do
			_arg0(_v, _k, _statusEffects)
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
		if isClientContext() then
			logWarning("Cannot use :TakeDamage() on client")
			return nil
		end
		local originalDamage = Container.Damage
		local modifiedDamage = originalDamage
		local _statusEffects = self.statusEffects
		local _arg0 = function(Status)
			modifiedDamage = Status:HandleDamage(modifiedDamage, originalDamage)
		end
		for _k, _v in _statusEffects do
			_arg0(_v, _k, _statusEffects)
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
		local _statusEffects = self.statusEffects
		local _arg0 = Status:GetId()
		local _status = Status
		_statusEffects[_arg0] = _status
		self.StatusEffectAdded:Fire(Status)
		Status.HumanoidDataChanged:Connect(function()
			return self:updateHumanoidProps()
		end)
		Status.StateChanged:Connect(function()
			self:updateHumanoidProps()
		end)
		Status.Destroyed:Connect(function()
			local _statusEffects_1 = self.statusEffects
			local _arg0_1 = Status:GetId()
			_statusEffects_1[_arg0_1] = nil
			self.StatusEffectRemoved:Fire(Status)
			self:updateHumanoidProps()
		end)
	end
	function Character:_addSkill(Skill)
		local name = Skill:GetName()
		if self.skills[name] ~= nil then
			logError("Skill with name " .. (name .. (" is already registered for character " .. tostring(self.Instance))))
		end
		local _skills = self.skills
		local _skill = Skill
		_skills[name] = _skill
		Skill.Destroyed:Connect(function()
			self.skills[name] = nil
		end)
	end
	function Character:_packData()
		local packedStatusEffect = {}
		local _statusEffects = self.statusEffects
		local _arg0 = function(Status, Id)
			local _id = Id
			local _arg1 = Status:_packData()
			packedStatusEffect[_id] = _arg1
			return packedStatusEffect
		end
		for _k, _v in _statusEffects do
			_arg0(_v, _k, _statusEffects)
		end
		return {
			instance = self.Instance,
			statusEffects = packedStatusEffect,
			defaultProps = self.defaultsProps,
			moveset = self.moveset,
			skills = {},
		}
	end
	function Character:SetDefaultProps(Props)
		self.defaultsProps = Props
		if isServerContext() then
			rootProducer.patchCharacterData(self.id, {
				defaultProps = Props,
			})
		end
	end
	function Character:GetDefaultsProps()
		return table.clone(self.defaultsProps)
	end
	function Character:GetCharacterMap_TS()
		return table.clone(Character.currentCharMap)
	end
	function Character:GetCharacterFromId_TS(Id)
		for _, Character in pairs(self.currentCharMap) do
			if Character:GetId() == Id then
				return Character
			end
		end
	end
	function Character:GetCharacterFromInstance_TS(Instance)
		local _currentCharMap = Character.currentCharMap
		local _instance = Instance
		return _currentCharMap[_instance]
	end
	function Character.GetCharacterMap()
		return table.clone(Character.currentCharMap)
	end
	function Character.GetCharacterFromInstance(Instance)
		local _currentCharMap = Character.currentCharMap
		local _instance = Instance
		return _currentCharMap[_instance]
	end
	function Character:GetAllStatusEffects()
		return mapToArray(self.statusEffects)
	end
	function Character:GetAllActiveStatusEffects()
		local _exp = mapToArray(self.statusEffects)
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
		local _exp = mapToArray(self.statusEffects)
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
		local _exp = mapToArray(self.statusEffects)
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
		for _, Effect in pairs(self.statusEffects) do
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
		return mapToArray(self.skills)
	end
	function Character:GetAllActiveSkills()
		local _exp = mapToArray(self.skills)
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
		local _skills = self.skills
		local _name = Name
		return _skills[_name]
	end
	function Character:GetSkillFromConstructor(Constructor)
		local _skills = self.skills
		local _arg0 = tostring(Constructor)
		return _skills[_arg0]
	end
	function Character:ApplyMoveset(Moveset)
		if not isServerContext() then
			logWarning("Attempted to apply moveset on client")
			return nil
		end
		local _moveset = Moveset
		local movesetObject = if type(_moveset) == "string" then GetMovesetObjectByName(Moveset) else Moveset
		if not movesetObject then
			logError("The provided moveset is invalid")
		end
		local _value = self.moveset
		if _value ~= "" and _value then
			local _skills = movesetObject.Skills
			local _arg0 = function(SkillConstructor)
				local name = tostring(SkillConstructor)
				local _result = self.skills[name]
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
			local _result = self.skills[name]
			if _result ~= nil then
				_result:Destroy()
			end
			SkillConstructor.new(self)
		end
		for _k, _v in _skills do
			_arg0(_v, _k - 1, _skills)
		end
		local oldMoveset = self.moveset
		self.moveset = movesetObject.Name
		self.MovesetChanged:Fire(movesetObject.Name, oldMoveset)
		rootProducer.patchCharacterData(self.id, {
			moveset = self.moveset,
		})
	end
	function Character:GetMoveset()
		return self.moveset
	end
	function Character:GetMovesetSkills(Moveset)
		if Moveset == nil then
			Moveset = self.moveset
		end
		if not (Moveset ~= "" and Moveset) then
			return nil
		end
		local movesetObject = GetMovesetObjectByName(Moveset)
		if not movesetObject then
			return nil
		end
		local skills = {}
		local _skills = self.skills
		local _arg0 = function(Skill)
			local _skills_1 = movesetObject.Skills
			local _arg0_1 = function(T)
				return tostring(T) == tostring((getmetatable(Skill)))
			end
			-- ▼ ReadonlyArray.find ▼
			local _result
			for _i, _v in _skills_1 do
				if _arg0_1(_v, _i - 1, _skills_1) == true then
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
		for _k, _v in _skills do
			_arg0(_v, _k, _skills)
		end
		return skills
	end
	function Character:ClearMoveset()
		if not isServerContext() then
			logError("Attempted to clear moveset on client")
		end
		local _value = self.moveset
		if not (_value ~= "" and _value) then
			return nil
		end
		local movesetObject = GetMovesetObjectByName(self.moveset)
		if not movesetObject then
			return nil
		end
		local _skills = movesetObject.Skills
		local _arg0 = function(SkillConstructor)
			local name = tostring(SkillConstructor)
			local _result = self.skills[name]
			if _result ~= nil then
				_result:Destroy()
			end
		end
		for _k, _v in _skills do
			_arg0(_v, _k - 1, _skills)
		end
		local oldMoveset = self.moveset
		self.moveset = nil
		self.MovesetChanged:Fire(self.moveset, oldMoveset)
	end
	function Character:ApplySkillsFromMoveset(Moveset)
		local _skills = Moveset.Skills
		local _arg0 = function(SkillConstructor)
			local name = tostring(SkillConstructor)
			local _result = self.skills[name]
			if _result ~= nil then
				_result:Destroy()
			end
			SkillConstructor.new(self)
		end
		for _k, _v in _skills do
			_arg0(_v, _k - 1, _skills)
		end
	end
	function Character:setupReplication_Client()
		if not isClientContext() then
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
			self.moveset = New
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
				local _statusEffects_1 = self.statusEffects
				local _id = Id
				if not (_statusEffects_1[_id] ~= nil) then
					processStatusAddition(StatusData, Id)
				end
			end
			for _k, _v in _statusEffects do
				_arg0(_v, _k, _statusEffects)
			end
			local _statusEffects_1 = self.statusEffects
			local _arg0_1 = function(Status, Id)
				local _statusEffects_2 = CharacterData.statusEffects
				local _id = Id
				local _condition = not (_statusEffects_2[_id] ~= nil)
				if _condition then
					_condition = tonumber(Id) > 0
				end
				if _condition then
					Status:Destroy()
					self.StatusEffectRemoved:Fire(Status)
				end
			end
			for _k, _v in _statusEffects_1 do
				_arg0_1(_v, _k, _statusEffects_1)
			end
			local _skills = CharacterData.skills
			local _arg0_2 = function(SkillData, Name)
				local _skills_1 = self.skills
				local _name = Name
				if not (_skills_1[_name] ~= nil) then
					proccessSkillAddition(SkillData, Name)
				end
			end
			for _k, _v in _skills do
				_arg0_2(_v, _k, _skills)
			end
			local _skills_1 = self.skills
			local _arg0_3 = function(Skill, Name)
				local _skills_2 = CharacterData.skills
				local _name = Name
				if not (_skills_2[_name] ~= nil) then
					Skill:Destroy()
				end
			end
			for _k, _v in _skills_1 do
				_arg0_3(_v, _k, _skills_1)
			end
			if CharacterData.moveset ~= self.moveset then
				proccessMovesetChange(CharacterData.moveset, self.moveset)
			end
			if CharacterData.defaultProps ~= self.defaultsProps then
				self:SetDefaultProps(CharacterData.defaultProps)
			end
		end
		local dataSelector = SelectCharacterData(self:GetId())
		local disconnect = rootProducer:subscribe(dataSelector, proccessDataUpdate)
		proccessDataUpdate(dataSelector(rootProducer:getState()))
		self.janitor:Add(disconnect)
		self:updateHumanoidProps()
	end
	function Character:updateHumanoidProps()
		if isServerContext() and self.Player then
			return nil
		end
		local statuses = {}
		local _statusEffects = self.statusEffects
		local _arg0 = function(Status)
			if Status:GetHumanoidData() and Status:GetState().IsActive then
				local _status = Status
				table.insert(statuses, _status)
			end
		end
		for _k, _v in _statusEffects do
			_arg0(_v, _k, _statusEffects)
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
	Character.currentCharMap = {}
	Character.CharacterCreated = Signal.new()
	Character.CharacterDestroyed = Signal.new()
end
return {
	Character = Character,
}
