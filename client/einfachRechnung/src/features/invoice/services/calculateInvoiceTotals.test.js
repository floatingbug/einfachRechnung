import {describe, expect, it} from "vitest";
import calculateInvoiceTotals from "./calculateInvoiceTotals.js";

describe("calculateInvoiceTotals", () => {
	it("berechnet Netto-, Steuer- und Bruttosumme je Steuersatz", () => {
		const result = calculateInvoiceTotals([
			{quantity: 2, unitPrice: 100, taxRate: 19},
			{quantity: 1, unitPrice: 50, taxRate: 7},
		]);

		expect(result.netTotal).toBe(250);
		expect(result.taxBreakdown).toEqual({19: 38, 7: 3.5});
		expect(result.taxTotal).toBe(41.5);
		expect(result.grossTotal).toBe(291.5);
	});
});
