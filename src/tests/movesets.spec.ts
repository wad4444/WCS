/// <reference types="@rbxts/testez/globals" />

import { Workspace } from "@rbxts/services";
import { CreateMoveset, GetMovesetObjectByName, SkillBase, SkillDecorator } from "exports";

export = function () {
    it("should register a moveset", () => {
        expect(CreateMoveset("__any", [])).to.be.ok();
    });

    it("should index a moveset", () => {
        const moveset = CreateMoveset("____any", []);
        expect(GetMovesetObjectByName(moveset.Name)).to.be.equal(moveset);
    });

    it("should error if not a valid array", () => {
        expect(() => CreateMoveset("_smhsmh", Workspace as never)).to.throw("array");
    });

    it("should not accept invalid skills", () => {
        expect(() => CreateMoveset("_smhsrmh", [[] as never])).to.throw("constructor");
    });

    it("should be okay if valid", () => {
        @SkillDecorator
        class someskill111 extends SkillBase {}

        expect(() => CreateMoveset("_somemovset1", [someskill111])).to.be.ok();
    });
};
