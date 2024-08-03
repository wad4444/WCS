/// <reference types="@rbxts/testez/globals" />

import { Janitor } from "@rbxts/janitor";
import { RunService, Workspace } from "@rbxts/services";
import {
	Character,
	type DamageContainer,
	Skill,
	SkillDecorator,
	StatusEffect,
	StatusEffectDecorator,
} from "exports";
import { shallowEqual } from "source/utility";

function haveKeys(object: object, keys: string[]) {
	// eslint-disable-next-line roblox-ts/no-array-pairs
	for (const [i, v] of pairs(keys)) {
		if (!(v in object)) return false;
	}

	return true;
}

export = () => {
	const janitor = new Janitor();

	@SkillDecorator
	class someSkill extends Skill {
		protected DamageModificationPriority = 2;
	}

	@StatusEffectDecorator
	class someStatus extends StatusEffect {}

	@StatusEffectDecorator
	class nullifyingStatus extends StatusEffect {
		protected DamageModificationPriority = 2;

		public HandleDamage(Modified: number, Original: number): number {
			return 0;
		}
	}

	@StatusEffectDecorator
	class increaseStatus extends StatusEffect {
		public HandleDamage(Modified: number, Original: number): number {
			return Modified + 10;
		}
	}

	function makeChar() {
		const part = new Instance("Part");
		new Instance("Humanoid", part);
		janitor.Add(part);

		const character = new Character(part);
		janitor.Add(character);
		return character;
	}

	describe("instantiation", () => {
		it("should instantiate a character over a valid instance", () => {
			expect(makeChar()).to.be.ok();
		});

		it("should throw if instance is invalid", () => {
			expect(() => new Character(Workspace)).to.throw();
		});
	});

	describe("humanoid props", () => {
		it("should have valid humanoid props", () => {
			expect(
				haveKeys(makeChar().GetDefaultProps(), [
					"WalkSpeed",
					"JumpPower",
					"JumpHeight",
					"AutoRotate",
				]),
			).to.be.equal(true);
		});

		it("should set new props", () => {
			const char = makeChar();
			const props = {
				WalkSpeed: 0,
				JumpPower: 0,
				JumpHeight: 0,
				AutoRotate: false,
			} as const;
			char.SetDefaultProps(props);
			expect(shallowEqual(char.GetDefaultProps(), props)).to.be.equal(true);
		});

		it("should calculate props", () => {
			@StatusEffectDecorator
			class propsChangingStatus extends StatusEffect {
				protected OnConstructServer(): void {
					this.SetHumanoidData({
						WalkSpeed: [0, "Set"],
					});
				}
			}

			const char = makeChar();
			const status = new propsChangingStatus(char);
			status.Start();
			RunService.Heartbeat.Wait();

			expect(char.GetAppliedProps().WalkSpeed).to.be.equal(0);
			status.Destroy();

			RunService.Heartbeat.Wait();
			expect(char.GetAppliedProps().WalkSpeed).to.be.equal(16);
		});
	});

	describe("skills", () => {
		it("should add a skill", () => {
			const char = makeChar();
			new someSkill(char);

			RunService.Heartbeat.Wait();

			expect(char.GetSkillFromConstructor(someSkill)).to.be.ok();
			expect(char.GetSkillFromString(tostring(someSkill))).to.be.ok();
		});

		it("should fire events", () => {
			const char = makeChar();
			let changed = 0;

			char.SkillAdded.Connect(() => changed++);
			char.SkillRemoved.Connect(() => changed++);
			char.SkillStarted.Connect(() => changed++);
			char.SkillEnded.Connect(() => changed++);

			const x = new someSkill(char);
			x.Start();
			RunService.Heartbeat.Wait();
			x.Destroy();
			RunService.Heartbeat.Wait();

			expect(changed).to.be.equal(4);
		});

		it("should remove skills", () => {
			const char = makeChar();
			new someSkill(char);

			char.GetSkills().forEach((T) => T.Destroy());
			RunService.Heartbeat.Wait();
			expect(char.GetSkills().size()).to.be.equal(0);
		});
	});

	describe("statuses", () => {
		it("should add a status", () => {
			expect(new someStatus(makeChar())).to.be.ok();
		});

		it("should list the added status", () => {
			const char = makeChar();
			new someStatus(char);

			expect(char.GetAllStatusEffects().size()).to.be.equal(1);
			expect(char.GetAllStatusEffectsOfType(someStatus).size()).to.be.equal(1);
		});

		it("should list an active status", () => {
			const char = makeChar();
			const status = new someStatus(char);
			status.Start();

			expect(
				char.GetAllActiveStatusEffectsOfType(someStatus).size(),
			).to.be.equal(1);
		});

		it("should fire events", () => {
			const char = makeChar();
			let changed = 0;

			char.StatusEffectAdded.Connect(() => changed++);
			char.StatusEffectRemoved.Connect(() => changed++);

			char.StatusEffectStarted.Connect(() => changed++);
			char.StatusEffectEnded.Connect(() => changed++);

			const x = new someStatus(char);
			x.Start();

			RunService.Heartbeat.Wait();
			x.End();
			RunService.Heartbeat.Wait();
			x.Destroy();

			expect(changed).to.be.equal(4);
		});

		it("should remove a status", () => {
			const char = makeChar();
			new someStatus(char);

			char.GetAllStatusEffects().forEach((T) => T.Destroy());
			RunService.Heartbeat.Wait();
			expect(char.GetAllStatusEffects().size()).to.be.equal(0);
		});
	});

	describe("static callbacks", () => {
		it("should fire static callbacks", () => {
			const changed: boolean[] = [];
			Character.CharacterDestroyed.Connect(() => changed.push(true));
			Character.CharacterCreated.Connect(() => changed.push(true));

			makeChar().Destroy();
			RunService.Heartbeat.Wait();

			expect(changed.size()).to.be.equal(2);
		});
	});

	describe("damage", () => {
		it("should take damage", () => {
			makeChar().TakeDamage({
				Source: undefined,
				Damage: 10,
			});
		});

		it("should fire damage taken callback", () => {
			const char = makeChar();
			let pass = false;
			char.DamageTaken.Connect(() => {
				pass = true;
			});

			char.TakeDamage({
				Source: undefined,
				Damage: 10,
			});

			RunService.Heartbeat.Wait();
			expect(pass).to.be.equal(true);
		});

		it("should modify damage", () => {
			const char = makeChar();
			new increaseStatus(char).Start();

			RunService.Heartbeat.Wait();

			expect(
				char.PredictDamage({ Damage: 100, Source: undefined }).Damage,
			).to.be.equal(110);
		});

		it("should respect modification priority", () => {
			const char = makeChar();
			new nullifyingStatus(char).Start();
			new increaseStatus(char).Start();

			RunService.Heartbeat.Wait();

			expect(
				char.PredictDamage({ Damage: 100, Source: undefined }).Damage,
			).to.be.equal(0);
		});

		it("should fire damage dealt callback", () => {
			const char1 = makeChar();
			const char2 = makeChar();

			@SkillDecorator
			class __skill extends Skill {
				protected OnStartServer(): void {
					char2.TakeDamage(this.CreateDamageContainer(10));
				}
			}

			const skill = new __skill(char1);
			let container = undefined as DamageContainer | undefined;
			let enemy = undefined as Character | undefined;

			char1.DamageDealt.Connect((_enemy, _container) => {
				enemy = _enemy;
				container = _container;
			});

			skill.Start();
			RunService.Heartbeat.Wait();

			expect(container).to.be.ok();
			expect(enemy).to.be.equal(char2);
			expect(container?.Damage).to.be.equal(10);
			expect(container?.Source).to.be.equal(skill);
		});
	});

	describe("destroy", () => {
		it("should destroy successfully", () => {
			let pass = false;
			const char = makeChar();
			char.Destroyed.Connect(() => {
				pass = true;
			});
			char.Destroy();

			RunService.Heartbeat.Wait();

			expect(pass).to.be.equal(true);
			expect(char.IsDestroyed()).to.be.equal(true);
		});

		it("should destroy all skills and statuses", () => {
			const char = makeChar();
			new someStatus(char);
			new someSkill(char);

			char.Destroy();
			RunService.Heartbeat.Wait();

			expect(char.GetAllStatusEffects().size()).to.be.equal(0);
			expect(char.GetSkills().size()).to.be.equal(0);
		});
	});

	describe("static", () => {
		it("should return a valid character map", () => {
			const map = Character.GetCharacterMap();
			expect(map).to.be.a("table");
			expect(table.isfrozen(map)).to.be.equal(true);
		});

		it("should get the character using static methods", () => {
			const char = makeChar();
			expect(Character.GetCharacterFromInstance(char.Instance)).to.be.equal(
				char,
			);
			expect(Character.GetCharacterFromId(char.GetId())).to.be.equal(char);
		});
	});

	afterAll(() => janitor.Cleanup());
};
