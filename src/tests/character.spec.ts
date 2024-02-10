/// <reference types="@rbxts/testez/globals" />

import { Janitor } from "@rbxts/janitor";
import { shallowEqual } from "@rbxts/reflex";
import { RunService, Workspace } from "@rbxts/services";
import { Character, Skill, SkillDecorator, StatusEffect, StatusEffectDecorator } from "exports";

function haveKeys(object: object, keys: string[]) {
    // eslint-disable-next-line roblox-ts/no-array-pairs
    for (const [i, v] of pairs(keys)) {
        if (!(v in object)) return false;
    }

    return true;
}

export = function () {
    const janitor = new Janitor();

    @SkillDecorator
    class someSkill extends Skill {}

    @StatusEffectDecorator
    class someStatus extends StatusEffect {}

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
                haveKeys(makeChar().GetDefaultsProps(), ["WalkSpeed", "JumpPower", "JumpHeight", "AutoRotate"]),
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
            expect(shallowEqual(char.GetDefaultsProps(), props)).to.be.equal(true);
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

            expect(char.GetAllActiveStatusEffectsOfType(someStatus).size()).to.be.equal(1);
        });

        it("should remove a status", () => {
            const char = makeChar();
            new someStatus(char);

            char.GetAllStatusEffects().forEach((T) => T.Destroy());
            RunService.Heartbeat.Wait();
            expect(char.GetAllStatusEffects().size()).to.be.equal(0);
        });
    });

    describe("damage", () => {
        it("should take damage", () => {
            makeChar().TakeDamage({
                Source: undefined,
                Damage: 10,
            });
        });

        it("should fire callbacks", () => {
            const char = makeChar();
            let pass = false;
            char.DamageTaken.Connect(() => (pass = true));

            char.TakeDamage({
                Source: undefined,
                Damage: 10,
            });

            RunService.Heartbeat.Wait();
            expect(pass).to.be.equal(true);
        });
    });

    describe("destroy", () => {
        it("should destroy successfully", () => {
            let pass = false;
            const char = makeChar();
            char.Destroyed.Connect(() => (pass = true));
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

    afterAll(() => janitor.Cleanup());
};
