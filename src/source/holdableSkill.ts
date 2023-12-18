import { Skill } from "./skill";
import { ReplicatableValue } from "./utility";

export class HoldableSkill<
    StarterParams extends ReplicatableValue = void,
    ServerToClientMessage extends ReplicatableValue = void,
    ClientToServerMessage extends ReplicatableValue = void,
> extends Skill<StarterParams, ServerToClientMessage, ClientToServerMessage> {
    protected HoldTime = 10;
}
