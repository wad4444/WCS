/// <reference types="@rbxts/testez/globals" />

import { CreateMoveset, GetMovesetObjectByName } from "exports";

export = function () {
    it("should register a moveset", () => {
        expect(CreateMoveset("__any", [])).to.be.ok();
    });

    it("should index a moveset", () => {
        const moveset = CreateMoveset("____any", []);
        expect(GetMovesetObjectByName(moveset.Name)).to.be.equal(moveset);
    });
};
