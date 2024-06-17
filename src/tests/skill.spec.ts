/// <reference types="@rbxts/testez/globals" />

import { Janitor } from "@rbxts/janitor";
import { RunService } from "@rbxts/services";
import { t } from "@rbxts/t";
import { SkillDecorator, Skill, Character, SkillType, HoldableSkill } from "exports";

export = function () {
    const janitor = new Janitor();

    @SkillDecorator
    class yieldingSkill extends Skill {
        protected OnStartServer(StarterParams: void): void {
            task.wait(1);
        }

        public setCheckedByOthers(check: boolean) {
            this.CheckedByOthers = check;
        }
    }

    @SkillDecorator
    class yieldingSkill2 extends Skill {
        protected OnStartServer(StarterParams: void): void {
            task.wait(1);
        }
    }

    @SkillDecorator
    class emptySkill extends Skill<[], [], number> {
        public changeMeta(meta: number) {
            this.SetMetadata(meta);
        }

        public setCheckOthers(check: boolean): void {
            this.CheckOthersActive = check;
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

    @SkillDecorator
    class debounceSkill extends Skill {
        protected OnStartServer() {
            this.ApplyCooldown(2);
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

        it("should check for applied decorator", () => {
            class wrongSkill extends Skill {}
            expect(() => new wrongSkill(makeChar())).to.throw("decorator");
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

        it("should pass starter params", () => {
            let param: number;

            @SkillDecorator
            class sum_skill_a extends Skill<[number]> {
                protected OnStartServer(a: number): void {
                    param = a;
                }
            }

            const char = makeChar();
            const skill = new sum_skill_a(char);
            skill.Start(10);

            RunService.Heartbeat.Wait();

            expect(param!).to.be.equal(10);
        });

        it("should validate starter params", () => {
            @SkillDecorator
            class sum_skill_b extends Skill<[number]> {
                protected readonly ParamValidators = [t.number] as const;
                protected OnStartServer(a: number) {
                    task.wait(1);
                }
            }

            const skill = new sum_skill_b(makeChar());
            skill.Start("" as never);

            RunService.Heartbeat.Wait();

            expect(skill.GetState().IsActive).to.be.equal(false);
        });

        it("should check if other skills are active", () => {
            const char = makeChar();
            const skill_a = new yieldingSkill(char);
            const skill_b = new yieldingSkill2(char);

            skill_a.Start();
            skill_b.Start();

            RunService.Heartbeat.Wait();

            expect(skill_b.GetState().IsActive).to.be.equal(false);
        });

        it("should respect checked by others", () => {
            const char = makeChar();
            const skill_a = new yieldingSkill(char);
            const skill_b = new yieldingSkill2(char);

            skill_a.setCheckedByOthers(false);

            skill_a.Start();
            skill_b.Start();

            RunService.Heartbeat.Wait();

            expect(skill_b.GetState().IsActive).to.be.equal(true);
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

        it("should clean the janitor after skill ends", () => {
            let changed = false;

            @SkillDecorator
            class sumsumSkill extends Skill {
                protected OnConstructServer(): void {
                    this.Janitor.Add(() => (changed = true));
                }
            }

            const skill = new sumsumSkill(makeChar());
            skill.Start();

            RunService.Heartbeat.Wait();

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

        it("should give end timestamp if is on cooldown", () => {
            const skill = new debounceSkill(makeChar());
            expect(skill.GetDebounceEndTimestamp()).to.never.be.ok();

            skill.Start();
            RunService.Heartbeat.Wait();

            expect(skill.GetDebounceEndTimestamp()).to.be.a("number");
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
