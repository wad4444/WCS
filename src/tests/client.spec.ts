/// <reference types="@rbxts/testez/globals" />

import { CreateClient } from "exports";

export = () => {
	describe("client", () => {
		it("should not be instantiated on server side", () => {
			expect(CreateClient).to.throw();
		});
	});
};
