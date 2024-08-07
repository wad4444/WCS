/* eslint-disable roblox-ts/no-array-pairs */
import { RunService } from "@rbxts/services";
import { Timer, TimerState } from "@rbxts/timer";
import type { Character } from "./character";
import {
	SkillBase,
	type SkillProps,
	SkillType,
	type _internal_SkillState,
} from "./skill";
import { isClientContext, isServerContext, logError } from "./utility";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyHoldableSkill = HoldableSkill<any, any[], any>;
export type UnknownHoldableSkill = HoldableSkill<unknown[], unknown[], unknown>;

export abstract class HoldableSkill<
	StarterParams extends unknown[] = [],
	ConstructorArguments extends unknown[] = [],
	Metadata = void,
> extends SkillBase<StarterParams, ConstructorArguments, Metadata> {
	/** Manually starting or stopping the timer will break things */
	protected readonly HoldTimer = new Timer(10);
	protected _skillType: SkillType = SkillType.Holdable;

	constructor(Character: Character);
	/**
	 * @internal Reserved for internal usage
	 * @hidden
	 */
	constructor(Character: SkillProps);
	constructor(Props: Character | SkillProps) {
		super(Props as never);
		if (isServerContext()) {
			this._janitor.Add(
				this.HoldTimer.completed.Connect(
					() => this.GetState().IsActive && this.End(),
				),
				"Disconnect",
			);
		}
		this._janitor.Add(this.HoldTimer, "destroy");
		this._init();
	}

	/** @internal */
	protected _stateDependentCallbacks(
		State: _internal_SkillState,
		PreviousState: _internal_SkillState,
	) {
		if (!PreviousState.IsActive && State.IsActive) {
			if (this.GetState().MaxHoldTime !== undefined) this.HoldTimer.start();
			this.Started.Fire();

			this._executionThread = task.spawn(() => {
				isClientContext()
					? this.OnStartClient(...(State.StarterParams as StarterParams))
					: this.OnStartServer(...(State.StarterParams as StarterParams));
			});
		} else if (PreviousState.IsActive && !State.IsActive) {
			if (this.HoldTimer.getState() === TimerState.Running)
				this.HoldTimer.stop();
			if (this._executionThread) task.cancel(this._executionThread);

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

		this._setState({ MaxHoldTime: MaxHoldTime });
		if (MaxHoldTime) this.HoldTimer.setLength(MaxHoldTime);
	}

	/**
	 * Retrieves the maximum hold time.
	 */
	public GetMaxHoldTime() {
		return this.GetState().MaxHoldTime;
	}
}
