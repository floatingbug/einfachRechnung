import {describe, expect, it} from "vitest";
import {isValidPayment} from "./payment.rules.js";

describe("isValidPayment", () => {
	it("lehnt ungültige oder zu hohe Zahlungen ab", () => {
		expect(isValidPayment({amount: 0}, 100).valid).toBe(false);
		expect(isValidPayment({amount: 101}, 100).valid).toBe(false);
	});

	it("akzeptiert eine Zahlung innerhalb des offenen Betrags", () => {
		expect(isValidPayment({amount: 100}, 100)).toEqual({valid: true});
	});
});
