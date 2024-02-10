-- Compiled with roblox-ts v2.2.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
--/ <reference types="@rbxts/testez/globals" />
local Janitor = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "janitor", "src").Janitor
local shallowEqual = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "reflex", "src").shallowEqual
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local RunService = _services.RunService
local Workspace = _services.Workspace
local _exports = TS.import(script, game:GetService("ReplicatedStorage"), "library", "exports")
local Character = _exports.Character
local Skill = _exports.Skill
local SkillDecorator = _exports.SkillDecorator
local StatusEffect = _exports.StatusEffect
local StatusEffectDecorator = _exports.StatusEffectDecorator
local function haveKeys(object, keys)
	-- eslint-disable-next-line roblox-ts/no-array-pairs
	for i, v in pairs(keys) do
		if not (object[v] ~= nil) then
			return false
		end
	end
	return true
end
return function()
	local janitor = Janitor.new()
	local someSkill
	do
		local super = Skill
		someSkill = setmetatable({}, {
			__tostring = function()
				return "someSkill"
			end,
			__index = super,
		})
		someSkill.__index = someSkill
		function someSkill.new(...)
			local self = setmetatable({}, someSkill)
			return self:constructor(...) or self
		end
		function someSkill:constructor(...)
			super.constructor(self, ...)
		end
		someSkill = SkillDecorator(someSkill) or someSkill
	end
	local someStatus
	do
		local super = StatusEffect
		someStatus = setmetatable({}, {
			__tostring = function()
				return "someStatus"
			end,
			__index = super,
		})
		someStatus.__index = someStatus
		function someStatus.new(...)
			local self = setmetatable({}, someStatus)
			return self:constructor(...) or self
		end
		function someStatus:constructor(...)
			super.constructor(self, ...)
		end
		someStatus = StatusEffectDecorator(someStatus) or someStatus
	end
	local function makeChar()
		local part = Instance.new("Part")
		Instance.new("Humanoid", part)
		janitor:Add(part)
		local character = Character.new(part)
		janitor:Add(character)
		return character
	end
	describe("instantiation", function()
		it("should instantiate a character over a valid instance", function()
			expect(makeChar()).to.be.ok()
		end)
		it("should throw if instance is invalid", function()
			expect(function()
				return Character.new(Workspace)
			end).to:throw()
		end)
	end)
	describe("humanoid props", function()
		it("should have valid humanoid props", function()
			expect(haveKeys(makeChar():GetDefaultsProps(), { "WalkSpeed", "JumpPower", "JumpHeight", "AutoRotate" })).to.be.equal(true)
		end)
		it("should set new props", function()
			local char = makeChar()
			local props = {
				WalkSpeed = 0,
				JumpPower = 0,
				JumpHeight = 0,
				AutoRotate = false,
			}
			char:SetDefaultProps(props)
			expect(shallowEqual(char:GetDefaultsProps(), props)).to.be.equal(true)
		end)
	end)
	describe("skills", function()
		it("should add a skill", function()
			local char = makeChar()
			someSkill.new(char)
			RunService.Heartbeat:Wait()
			print(char:GetSkills())
			expect(char:GetSkillFromConstructor(someSkill)).to.be.ok()
			expect(char:GetSkillFromString(tostring(someSkill))).to.be.ok()
		end)
		it("should remove skills", function()
			local char = makeChar()
			someSkill.new(char)
			local _exp = char:GetSkills()
			local _arg0 = function(T)
				return T:Destroy()
			end
			for _k, _v in _exp do
				_arg0(_v, _k - 1, _exp)
			end
			RunService.Heartbeat:Wait()
			expect(#char:GetSkills()).to.be.equal(0)
		end)
	end)
	describe("statuses", function()
		it("should add a status", function()
			expect(someStatus.new(makeChar())).to.be.ok()
		end)
		it("should list the added status", function()
			local char = makeChar()
			someStatus.new(char)
			expect(#char:GetAllStatusEffects()).to.be.equal(1)
			expect(#char:GetAllStatusEffectsOfType(someStatus)).to.be.equal(1)
		end)
		it("should list an active status", function()
			local char = makeChar()
			local status = someStatus.new(char)
			status:Start()
			expect(#char:GetAllActiveStatusEffectsOfType(someStatus)).to.be.equal(1)
		end)
		it("should remove a status", function()
			local char = makeChar()
			someStatus.new(char)
			local _exp = char:GetAllStatusEffects()
			local _arg0 = function(T)
				return T:Destroy()
			end
			for _k, _v in _exp do
				_arg0(_v, _k - 1, _exp)
			end
			RunService.Heartbeat:Wait()
			expect(#char:GetAllStatusEffects()).to.be.equal(0)
		end)
	end)
	describe("damage", function()
		it("should take damage", function()
			makeChar():TakeDamage({
				Source = nil,
				Damage = 10,
			})
		end)
		it("should fire callbacks", function()
			local char = makeChar()
			local pass = false
			char.DamageTaken:Connect(function()
				pass = true
				return pass
			end)
			char:TakeDamage({
				Source = nil,
				Damage = 10,
			})
			RunService.Heartbeat:Wait()
			expect(pass).to.be.equal(true)
		end)
	end)
	describe("destroy", function()
		it("should destroy successfully", function()
			local pass = false
			local char = makeChar()
			char.Destroyed:Connect(function()
				pass = true
				return pass
			end)
			char:Destroy()
			RunService.Heartbeat:Wait()
			expect(pass).to.be.equal(true)
			expect(char:IsDestroyed()).to.be.equal(true)
		end)
		it("should destroy all skills and statuses", function()
			local char = makeChar()
			someStatus.new(char)
			someSkill.new(char)
			char:Destroy()
			RunService.Heartbeat:Wait()
			expect(#char:GetAllStatusEffects()).to.be.equal(0)
			expect(#char:GetSkills()).to.be.equal(0)
		end)
	end)
	afterAll(function()
		return janitor:Cleanup()
	end)
end
