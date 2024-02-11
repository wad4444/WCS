/// <reference types="@rbxts/testez/globals" />

import { Janitor } from "@rbxts/janitor";
import { RunService } from "@rbxts/services";
import { SkillDecorator, Skill, Character, SkillType, HoldableSkill } from "exports";

export = function () {
    const janitor = new Janitor();

    @SkillDecorator
    class yieldingSkill extends Skill {
        protected OnStartServer(StarterParams: void): void {
            task.wait(1);
        }
    }

    @SkillDecorator
    class emptySkill extends Skill<void, [], number> {
        public changeMeta(meta: number) {
            this.SetMetadata(meta);
        }
    }

    @SkillDecorator
    class holdableSkill extends HoldableSkill {
        protected OnConstructServer(): void {
            this.SetMaxHoldTime(5);
        }

        public setTime(newTime: number | undefined): void {
            this.SetMaxHoldTime(newTime);
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
        it("should instantiate a skill", () => {
            expect(new emptySkill(makeChar())).to.be.ok();
        });

        it("should not allow double registration", () => {
            expect(() => {
                @SkillDecorator
                class emptySkill extends Skill {}
            }).to.throw();
        });
    });

    describe("startup / ending", () => {
        it("should start a skill", () => {
            const skill = new yieldingSkill(makeChar());

            let changed = false;
            skill.Started.Connect(() => (changed = true));

            skill.Start();
            RunService.Heartbeat.Wait();

            expect(changed).to.be.equal(true);
            expect(skill.GetState().IsActive).to.be.equal(true);
        });

        it("should end a skill", () => {
            const skill = new yieldingSkill(makeChar());
            skill.Start();

            let changed = false;
            skill.Ended.Connect(() => (changed = true));

            skill.End();
            RunService.Heartbeat.Wait();

            expect(skill.GetState().IsActive).to.be.equal(false);
            expect(changed).to.be.equal(true);
        });
    });

    describe("destruction", () => {
        it("should destroy a skill", () => {
            const skill = new emptySkill(makeChar());
            expect(skill.IsDestroyed()).to.be.equal(false);

            let changed = false;
            skill.Destroyed.Connect(() => (changed = true));

            skill.Destroy();
            RunService.Heartbeat.Wait();

            expect(skill.IsDestroyed()).to.be.equal(true);
            expect(changed).to.be.equal(true);
        });
    });

    describe("methods / callbacks", () => {
        it("should set/get metadata", () => {
            const skill = new emptySkill(makeChar());
            expect(skill.GetMetadata()).to.never.be.ok();

            let changed = false;
            skill.MetadataChanged.Connect(() => (changed = true));

            skill.changeMeta(5);
            RunService.Heartbeat.Wait();

            expect(skill.GetMetadata()).to.be.equal(5);
            expect(changed).to.be.equal(true);
        });

        it("should fire callbacks", () => {
            const changed: boolean[] = [];

            @SkillDecorator
            class skillWithCallback extends Skill {
                protected OnStartServer(StarterParams: void): void {
                    changed.push(true);
                }

                protected OnConstruct(): void {
                    changed.push(true);
                }

                protected OnConstructServer(): void {
                    changed.push(true);
                }
            }

            const skill = new skillWithCallback(makeChar());
            skill.Start();

            RunService.Heartbeat.Wait();
            expect(changed.size()).to.be.equal(3);
        });

        it("should return a valid skill type", () => {
            const skill = new emptySkill(makeChar());
            expect(skill.GetSkillType()).to.be.equal(SkillType.Default);
        });

        it("should return a valid name", () => {
            const skill = new emptySkill(makeChar());
            expect(skill.GetName()).to.be.equal(tostring(emptySkill));
        });
    });

    describe("holdable", () => {
        it("should instantiate a skill", () => {
            expect(new holdableSkill(makeChar())).to.be.ok();
        });

        it("should set/get max hold time", () => {
            const skill = new holdableSkill(makeChar());
            skill.setTime(5);
            expect(skill.GetMaxHoldTime()).to.be.equal(5);
        });
    });

    afterAll(() => janitor.Cleanup());
};
