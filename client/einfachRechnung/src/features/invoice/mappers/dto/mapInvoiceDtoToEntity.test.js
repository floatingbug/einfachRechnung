import {describe, expect, it} from "vitest";
import mapInvoiceDtoToEntity from "./mapInvoiceDtoToEntity.js";

describe("mapInvoiceDtoToEntity", () => {
	it("normalisiert ein API-DTO zu einer Rechnungsentität", () => {
		const invoice = mapInvoiceDtoToEntity({_id: "id-1", invoiceNumber: "R-1", customer: {name: "Ada"}, items: []});

		expect(invoice).toMatchObject({id: "id-1", invoiceNumber: "R-1", customer: {name: "Ada"}, items: []});
	});
});
