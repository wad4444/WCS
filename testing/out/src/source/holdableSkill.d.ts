import { SkillBase, SkillProps, SkillType, _internal_SkillState } from "./skill";
import { Timer } from "@rbxts/timer";
import { Character } from "./character";
export type AnyHoldableSkill = HoldableSkill<any, any[], any, any, any>;
export type UnknownHoldableSkill = HoldableSkill<unknown, unknown[], unknown, unknown, unknown>;
export declare abstract class HoldableSkill<StarterParams = void, ConstructorArguments extends unknown[] = [], Metadata = void, ServerToClientMessage = void, ClientToServerMessage = void> extends SkillBase<StarterParams, ConstructorArguments, Metadata, ServerToClientMessage | {
    __setHoldTime: number | undefined;
}, ClientToServerMessage> {
    /** Manually starting or stopping the timer will break things */
    protected readonly HoldTimer: Timer;
    protected _skillType: SkillType;
    constructor(Character: Character);
    /**
     * @internal Reserved for internal usage
     * @hidden
     */
    constructor(Character: SkillProps);
    /** @internal @hidden */
    protected _stateDependentCallbacks(State: _internal_SkillState, PreviousState: _internal_SkillState): void;
    /**
     * Sets the maximum hold time for the skill.
     */
    SetMaxHoldTime(MaxHoldTime?: number): void;
    /**
     * Retrieves the maximum hold time.
     */
    GetMaxHoldTime(): number | undefined;
}
