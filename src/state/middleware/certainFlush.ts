import { ProducerMiddleware } from "@rbxts/reflex";
import { Character } from "source/character";
import { RootActions, RootState } from "state/rootProducer";

export const certainFlushMiddleware: ProducerMiddleware<RootState, RootActions> = (producer) => {
    return (nextAction, name) => {
        return (...args) => {
            if (name.match("delete")[0]) {
                const previousState = producer.getState();

                const chars = Character.GetCharacterMap_TS();
                chars.forEach((char) => {
                    const oldCharData = previousState.replication.get(char.GetId());
                    char.GetSkills().forEach((skill) => {
                        skill._proccessDataUpdate(oldCharData?.skills.get(skill.GetName()));
                    });
                    char.GetAllStatusEffects().forEach((status) => {
                        status._proccessDataUpdate(oldCharData?.statusEffects.get(status.GetId()));
                    });
                });

                return nextAction(...args);
            }
            return nextAction(...args);
        };
    };
};
