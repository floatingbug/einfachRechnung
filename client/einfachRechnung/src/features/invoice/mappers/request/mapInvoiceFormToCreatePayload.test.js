import {describe, expect, it} from "vitest";
import mapInvoiceFormToCreatePayload from "./mapInvoiceFormToCreatePayload.js";

describe("mapInvoiceFormToCreatePayload", () => {
	it("übernimmt Verkäufer- und Leistungsdaten", () => {
		const result = mapInvoiceFormToCreatePayload({
			customer: {name: "Kunde"}, seller: {name: "Firma"}, items: [], serviceDate: "2026-01-01",
		});
		expect(result).toMatchObject({seller: {name: "Firma"}, customer: {name: "Kunde"}, serviceDate: "2026-01-01"});
	});
});
