import { Janitor } from "@rbxts/janitor";
import { RunService } from "@rbxts/services";
import { Character, StatusEffect, StatusEffectDecorator } from "exports";

export = () => {
	const janitor = new Janitor();

	@StatusEffectDecorator
	class emptyStatus extends StatusEffect<number> {
		changeMeta(newMeta: number) {
			this.SetMetadata(newMeta);
		}

		clearMeta() {
			this.ClearMetadata();
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
		it("should create a new status", () => {
			expect(new emptyStatus(makeChar())).to.be.ok();
		});

		it("should not allow double registration", () => {
			expect(() => {
				@StatusEffectDecorator
				class emptyStatus extends StatusEffect {}
			}).to.throw();
		});

		it("should check for applied decorator", () => {
			class wrongStatus extends StatusEffect {}
			expect(() => new wrongStatus(makeChar())).to.throw("decorator");
		});
	});

	describe("startup / ending", () => {
		it("should start a status", () => {
			const char = makeChar();
			const status = new emptyStatus(char);

			let changed = false;
			status.Started.Connect(() => {
				changed = true;
			});
			status.Start();
			RunService.Heartbeat.Wait();

			expect(char.GetAllActiveStatusEffects().size()).to.be.equal(1);
			expect(changed).to.be.equal(true);
			expect(status.GetState().IsActive).to.be.equal(true);
		});

		it("should end a status", () => {
			const char = makeChar();
			const status = new emptyStatus(char);
			status.Start();

			let changed = false;
			status.Ended.Connect(() => {
				changed = true;
			});

			status.End();
			RunService.Heartbeat.Wait();

			expect(char.GetAllActiveStatusEffects().size()).to.be.equal(0);
			expect(status.GetState().IsActive).to.be.equal(false);
			expect(changed).to.be.equal(true);
		});

		it("should destroy a status", () => {
			const status = new emptyStatus(makeChar());
			expect(status.IsDestroyed()).to.be.equal(false);

			let changed = false;
			status.Destroyed.Connect(() => {
				changed = true;
			});

			status.Destroy();
			RunService.Heartbeat.Wait();

			expect(status.IsDestroyed()).to.be.equal(true);
			expect(changed).to.be.equal(true);
		});
	});

	describe("methods / callbacks", () => {
		it("should set/get metadata", () => {
			const status = new emptyStatus(makeChar());
			expect(status.GetMetadata()).to.never.be.ok();

			let changed = false;
			status.MetadataChanged.Connect(() => {
				changed = true;
			});

			status.changeMeta(5);
			RunService.Heartbeat.Wait();

			expect(status.GetMetadata()).to.be.equal(5);
			expect(changed).to.be.equal(true);
		});

		it("should clear metadata", () => {
			const status = new emptyStatus(makeChar());

			status.changeMeta(5);
			status.clearMeta();
			RunService.Heartbeat.Wait();

			expect(status.GetMetadata()).to.never.be.ok();
		});

		it("should fire callbacks", () => {
			const changed: boolean[] = [];

			@StatusEffectDecorator
			class statusWithCallback extends StatusEffect {
				protected OnStartServer(): void {
					changed.push(true);
				}

				protected OnConstruct(): void {
					changed.push(true);
				}

				protected OnConstructServer(): void {
					changed.push(true);
				}
			}

			const status = new statusWithCallback(makeChar());
			status.Start();

			RunService.Heartbeat.Wait();
			expect(changed.size()).to.be.equal(3);
		});
	});

	describe("destruction", () => {
		it("should destroy a status", () => {
			const status = new emptyStatus(makeChar());
			expect(status.IsDestroyed()).to.be.equal(false);

			let changed = false;
			status.Destroyed.Connect(() => {
				changed = true;
			});

			status.Destroy();
			RunService.Heartbeat.Wait();

			expect(status.IsDestroyed()).to.be.equal(true);
			expect(changed).to.be.equal(true);
		});
	});

	afterAll(() => janitor.Cleanup());
};
