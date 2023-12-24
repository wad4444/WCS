/* eslint-disable roblox-ts/no-array-pairs */
import { RunService } from "@rbxts/services";
import { Skill, _internal_SkillState } from "./skill";
import { remotes } from "./remotes";
import { Timer, TimerState } from "@rbxts/timer";
import { Character } from "./character";
import { Flags } from "./flags";
import { logError } from "./utility";

export abstract class HoldableSkill<
    StarterParams = unknown,
    ServerToClientMessage = unknown,
    ClientToServerMessage = unknown,
> extends Skill<StarterParams, ServerToClientMessage | { __setHoldTime: number | undefined }, ClientToServerMessage> {
    private maxHoldTime?: number = undefined;
    /** Manually starting or stopping the timer will break things */
    protected readonly HoldTimer = new Timer(10);

    constructor(Character: Character);
    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    constructor(Character: Character, AllowClientInstantiation: (typeof Flags)["CanInstantiateSkillClient"]);
    constructor(Character: Character, AllowClientInstantiation?: (typeof Flags)["CanInstantiateSkillClient"]) {
        super(Character, AllowClientInstantiation as never);
        if (RunService.IsServer()) {
            this._janitor.Add(
                this.HoldTimer.completed.Connect(() => this.End()),
                "Disconnect",
            );
        }
    }

    /** @internal @hidden */
    protected _stateDependentCallbacks(State: _internal_SkillState, PreviousState: _internal_SkillState) {
        if (PreviousState._isActive_counter === State._isActive_counter) return;

        if (!PreviousState.IsActive && State.IsActive) {
            this.HoldTimer.start();
            RunService.IsClient()
                ? this.OnStartClient(State.StarterParams as StarterParams)
                : this.OnStartServer(State.StarterParams as StarterParams);
            this.Started.Fire();
        } else if (PreviousState.IsActive && !State.IsActive) {
            if (this.HoldTimer.getState() === TimerState.Running) this.HoldTimer.stop();
            RunService.IsClient() ? this.OnEndClient() : this.OnEndServer();
            this.Ended.Fire();
        }
        if (State.MaxHoldTime !== PreviousState.MaxHoldTime) {
            if (State.MaxHoldTime) this.HoldTimer.setLength(State.MaxHoldTime);
        }
        if (PreviousState.IsActive === State.IsActive && this.isReplicated) {
            this.OnStartClient(State.StarterParams as StarterParams);
            this.Started.Fire();
            this.OnEndClient();
            this.Ended.Fire();
        }
    }

    /**
     * Sets the maximum hold time for the skill.
     */
    public SetMaxHoldTime(MaxHoldTime?: number) {
        if (MaxHoldTime && MaxHoldTime <= 0) {
            logError("Max Hold Time can't be lower or equal to zero");
        }

        this.SetState({ MaxHoldTime: MaxHoldTime });
        if (this.maxHoldTime) this.HoldTimer.setLength(this.maxHoldTime);
    }

    /**
     * Retrieves the maximum hold time.
     */
    public GetMaxHoldTime() {
        return this.maxHoldTime;
    }
}
