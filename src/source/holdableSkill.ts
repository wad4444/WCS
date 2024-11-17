import { Timer, TimerState } from "@rbxts/timer";
import type { Character } from "./character";
import {
	SkillBase,
	type SkillProps,
	SkillType,
	type _internal_SkillState,
} from "./skill";
import { isClientContext, isServerContext, logError } from "./utility";

export type AnyHoldableSkill = HoldableSkill<any, any[], any>;
export type UnknownHoldableSkill = HoldableSkill<unknown[], unknown[], unknown>;

export abstract class HoldableSkill<
	StarterParams extends unknown[] = [],
	ConstructorArguments extends unknown[] = [],
	Metadata = void,
> extends SkillBase<StarterParams, ConstructorArguments, Metadata> {
	/** Manually starting or stopping the timer will break things */
	protected readonly HoldTimer = new Timer(10);
	/** @internal @hidden */
	protected skillType: SkillType = SkillType.Holdable;

	constructor(Character: Character, ...Args: ConstructorArguments);
	/**
	 * @internal Reserved for internal usage
	 * @hidden
	 */
	constructor(Character: SkillProps);
	constructor(Props: Character | SkillProps, ...Args: ConstructorArguments) {
		super(Props as never, ...Args);
		if (isServerContext()) {
			this.janitor.Add(
				this.HoldTimer.completed.Connect(
					() => this.GetState().IsActive && this.End(),
				),
				"Disconnect",
			);
		}
		this.janitor.Add(this.HoldTimer, "destroy");
		this.init();
	}

	/** @internal */
	protected stateDependentCallbacks(
		State: _internal_SkillState,
		PreviousState: _internal_SkillState,
	) {
		if (!PreviousState.IsActive && State.IsActive) {
			if (this.GetState().MaxHoldTime !== undefined) this.HoldTimer.start();
			this.Started.Fire();

			this.executionThread = task.spawn(() => {
				isClientContext()
					? this.OnStartClient(...(State.StarterParams as StarterParams))
					: this.OnStartServer(...(State.StarterParams as StarterParams));
			});
		} else if (PreviousState.IsActive && !State.IsActive) {
			if (this.HoldTimer.getState() === TimerState.Running)
				this.HoldTimer.stop();
			if (this.executionThread) task.cancel(this.executionThread);

			isClientContext() ? this.OnEndClient() : this.OnEndServer();
			this.Ended.Fire();
		}
		if (State.MaxHoldTime !== PreviousState.MaxHoldTime) {
			if (State.MaxHoldTime) this.HoldTimer.setLength(State.MaxHoldTime);
		}
	}

	/**
	 * Sets the maximum hold time for the skill.
	 */
	protected SetMaxHoldTime(MaxHoldTime?: number) {
		if (MaxHoldTime && MaxHoldTime <= 0) {
			logError("Max Hold Time can't be lower or equal to zero");
		}

		this.setState({ MaxHoldTime: MaxHoldTime });
		if (MaxHoldTime) this.HoldTimer.setLength(MaxHoldTime);
	}

	/**
	 * Retrieves the maximum hold time.
	 */
	public GetMaxHoldTime() {
		return this.GetState().MaxHoldTime;
	}
}
