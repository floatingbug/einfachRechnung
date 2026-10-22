import {describe, expect, it} from "vitest";
import {isValidPayment, isValidPaymentDate, validatePayment} from "./payment.rules.js";

describe("isValidPayment", () => {
	it("lehnt ungültige oder zu hohe Zahlungen ab", () => {
		expect(isValidPayment({amount: 0}, 100).valid).toBe(false);
		expect(isValidPayment({amount: 101}, 100).valid).toBe(false);
	});

	it("akzeptiert eine Zahlung innerhalb des offenen Betrags", () => {
		expect(isValidPayment({amount: 100}, 100)).toEqual({valid: true});
	});
});

describe("isValidPaymentDate", () => {
	it("akzeptiert ein gültiges Datum im Format YYYY-MM-DD", () => {
		expect(isValidPaymentDate({paidAt: "2026-10-22"})).toEqual({valid: true});
	});

	it("lehnt fehlende oder ungültige Daten ab", () => {
		expect(isValidPaymentDate({}).valid).toBe(false);
		expect(isValidPaymentDate({paidAt: "22.10.2026"}).valid).toBe(false);
		expect(isValidPaymentDate({paidAt: "2026-02-31"}).valid).toBe(false);
	});
});

describe("validatePayment", () => {
	it("prüft Betrag und Datum gemeinsam", () => {
		expect(validatePayment({amount: 50, paidAt: "2026-10-22"}, 100)).toEqual({valid: true});
		expect(validatePayment({amount: 50}, 100).valid).toBe(false);
	});
});
