/// <reference types="@rbxts/testez/globals" />

import { Janitor } from "@rbxts/janitor";
import { shallowEqual } from "@rbxts/reflex";
import { Workspace } from "@rbxts/services";
import { Character, Skill, SkillDecorator, StatusEffect, StatusEffectDecorator } from "exports";

function haveKeys(object: object, keys: string[]) {
    // eslint-disable-next-line roblox-ts/no-array-pairs
    for (const [i, v] of pairs(keys)) {
        if (!(i in object)) return false;
    }

    return true;
}

export = function () {
    const janitor = new Janitor();
    let char: Character;

    @SkillDecorator
    class someSkill extends Skill {}

    @StatusEffectDecorator
    class someStatus extends StatusEffect {}

    describe("instantiation", () => {
        it("should instantiate a character over a valid instance", () => {
            const model = new Instance("Humanoid", new Instance("Part"));
            janitor.Add(model);

            const character = new Character(model);
            expect(character).to.be.ok();

            char = character;

            janitor.Add(char);
        });

        it("should throw if instance is invalid", () => {
            expect(new Character(Workspace)).to.throw();
        });
    });

    describe("humanoid props", () => {
        it("should have valid humanoid props", () => {
            expect(
                haveKeys(char.GetDefaultsProps(), ["WalkSpeed", "JumpPower", "JumpHeight", "AutoRotate"]),
            ).to.be.equal(true);
        });

        it("should set new props", () => {
            const props = {
                WalkSpeed: 0,
                JumpPower: 0,
                JumpHeight: 0,
                AutoRotate: false,
            } as const;
            expect(char.SetDefaultProps(props)).to.be.ok();
            expect(shallowEqual(char.GetDefaultsProps(), props)).to.be.equal(true);
        });
    });

    describe("skills", () => {
        it("should add a skill", () => {
            expect(new someSkill(char)).to.be.ok();
        });

        it("should list the added skill", () => {
            expect(char.GetSkills().find((T) => T instanceof someSkill) !== undefined).to.be.equal(true);
        });

        it("should get the added skill by the name & constructor", () => {
            expect(char.GetSkillFromConstructor(someSkill) instanceof someSkill).to.be.equal(true);
            expect(char.GetSkillFromString(tostring(someSkill)) instanceof someSkill).to.be.equal(true);
        });

        it("should remove skills", () => {
            expect(char.GetSkills().forEach((T) => T.Destroy())).to.be.ok();
            expect(char.GetSkills().size()).to.be.equal(0);
        });
    });

    describe("statuses", () => {
        it("should add a status", () => {
            expect(new someStatus(char)).to.be.ok();
        });

        it("should list the added status", () => {
            expect(char.GetAllStatusEffects().find((T) => T instanceof someStatus) !== undefined).to.be.equal(true);
            expect(char.GetAllStatusEffectsOfType(someStatus).size()).to.be.equal(1);
        });

        it("should list an active status", () => {
            expect(char.GetAllStatusEffectsOfType(someStatus).forEach((T) => T.Start())).to.be.ok();
            expect(char.GetAllActiveStatusEffectsOfType(someStatus).size() > 0).to.be.equal(true);
        });

        it("should remove a status", () => {
            expect(char.GetAllStatusEffects().forEach((T) => T.Destroy())).to.be.ok();
            expect(char.GetAllStatusEffects().size()).to.be.equal(0);
        });
    });

    describe("damage", () => {
        it("should take damage", () => {
            expect(
                char.TakeDamage({
                    Source: undefined,
                    Damage: 10,
                }),
            ).to.be.ok();
        });

        it("should fire callbacks", () => {
            let pass = false;
            char.DamageTaken.Connect(() => (pass = true));

            expect(
                char.TakeDamage({
                    Source: undefined,
                    Damage: 10,
                }),
            ).to.be.ok();
            expect(pass).to.be.equal(true);
        });
    });

    describe("destroy", () => {
        beforeAll(() => {
            new someStatus(char);
            new someSkill(char);
        });

        it("should destroy successfully", () => {
            let pass = false;
            char.Destroyed.Connect(() => (pass = true));

            expect(char.Destroy()).to.be.ok();
            expect(pass).to.be.equal(true);
            expect(char.IsDestroyed()).to.be.equal(true);
        });

        it("should destroy all skills and statuses", () => {
            expect(char.GetAllStatusEffects().size()).to.be.equal(0);
            expect(char.GetSkills().size()).to.be.equal(0);
        });
    });

    afterAll(() => janitor.Cleanup());
};
