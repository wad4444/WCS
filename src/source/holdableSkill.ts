/* eslint-disable roblox-ts/no-array-pairs */
import { RunService } from "@rbxts/services";
import { Skill, _internal_SkillState } from "./skill";
import { remotes } from "./remotes";
import { Timer, TimerState } from "@rbxts/timer";
import { Character } from "./character";
import { Flags } from "./flags";

export class HoldableSkill<
    StarterParams = unknown,
    ServerToClientMessage = unknown,
    ClientToServerMessage = unknown,
> extends Skill<StarterParams, ServerToClientMessage, ClientToServerMessage> {
    protected MaxHoldTime = 10;
    protected readonly HoldTimer = new Timer(this.MaxHoldTime);

    constructor(Character: Character);
    /**
     * @internal Reserved for internal usage
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

    /** @internal */
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
        if (PreviousState.IsActive === State.IsActive && this.isReplicated) {
            this.OnStartClient(State.StarterParams as StarterParams);
            this.Started.Fire();
            this.OnEndClient();
            this.Ended.Fire();
        }
    }
}
