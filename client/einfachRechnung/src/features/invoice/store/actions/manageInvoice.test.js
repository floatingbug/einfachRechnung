import {describe, expect, it, vi} from "vitest";

vi.mock("../../services", () => ({
	services: {
		registerPayment: vi.fn().mockResolvedValue({id: "invoice-1", openAmount: 0, paymentStatus: "paid"}),
	},
}));

import {registerPayment} from "./manageInvoice.js";

describe("invoice store action registerPayment", () => {
	it("aktualisiert die Rechnungsentität im Store", async () => {
		const store = {invoices: [{id: "invoice-1", openAmount: 50}]};
		await registerPayment.call(store, {invoiceId: "invoice-1", payment: {amount: 50}, openAmount: 50});
		expect(store.invoices[0]).toMatchObject({openAmount: 0, paymentStatus: "paid"});
	});
});
