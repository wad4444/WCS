/// <reference types="@rbxts/testez/globals" />

import { Janitor } from "@rbxts/janitor";
import { RunService, Workspace } from "@rbxts/services";
import {
	Character,
	CreateMoveset,
	GetMovesetObjectByName,
	Skill,
	SkillDecorator,
} from "exports";

export = () => {
	const janitor = new Janitor();

	function makeChar() {
		const part = new Instance("Part");
		new Instance("Humanoid", part);
		janitor.Add(part);

		const character = new Character(part);
		janitor.Add(character);
		return character;
	}

	it("should register a moveset", () => {
		expect(CreateMoveset("__any", [])).to.be.ok();
	});

	it("should index a moveset", () => {
		const moveset = CreateMoveset("____any", []);
		expect(GetMovesetObjectByName(moveset.Name)).to.be.equal(moveset);
	});

	it("should error if not a valid array", () => {
		expect(() => CreateMoveset("_smhsmh", Workspace as never)).to.throw(
			"array",
		);
	});

	it("should respect constructor arguments", () => {
		let passedArg!: number;

		@SkillDecorator
		class test_skill1 extends Skill<[], [number]> {
			protected OnConstructServer(Args_0: number): void {
				passedArg = Args_0;
			}
		}

		const moveset = CreateMoveset("someMoveset", [test_skill1], {
			test_skill1: [10],
		});
		const char = makeChar();
		char.ApplyMoveset(moveset);

		RunService.Heartbeat.Wait();
		expect(passedArg).to.be.equal(10);
	});

	it("should fire events", () => {
		let i = 0;

		@SkillDecorator
		class test_skill2 extends Skill {}

		const moveset = CreateMoveset("someMoveset2", [test_skill2]);
		moveset.OnCharacterAdded.Once(() => i++);
		moveset.OnCharacterRemoved.Once(() => i++);

		const char = makeChar();
		char.ApplyMoveset(moveset);
		char.ClearMoveset();

		expect(i).to.be.equal(2);
	});

	it("should not accept invalid skills", () => {
		expect(() => CreateMoveset("_smhsrmh", [[] as never])).to.throw(
			"constructor",
		);
	});

	it("should be okay if valid", () => {
		@SkillDecorator
		class someskill111 extends Skill {}

		expect(() => CreateMoveset("_somemovset1", [someskill111])).to.be.ok();
	});

	afterAll(() => janitor.Cleanup());
};
