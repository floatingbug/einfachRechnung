import {describe, expect, it} from "vitest";
import {isValidCustomer} from "./customer.rules.js";

describe("isValidCustomer", () => {
	it("akzeptiert einen minimal gültigen Kunden", () => {
		expect(isValidCustomer({name: "Ada Lovelace", email: "ada@example.test"})).toEqual({valid: true, errors: {}});
	});

	it("meldet einen fehlenden Namen", () => {
		expect(isValidCustomer({email: "ada@example.test"})).toEqual({valid: false, errors: {name: ["REQUIRED"]}});
	});
});
