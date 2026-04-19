export default {
	invoices: [
		{
			id: "inv_1001",
			invoiceNumber: "INV-2026-1001",

			customer: {
				name: "Max Mustermann",
				street: "Teststraße 1",
				city: "Koblenz",
				postalCode: "56068",
				countryCode: "DE",
				email: "max@example.com"
			},

			seller: {
				name: "Meine Firma",
				street: "Straße 1",
				city: "Koblenz",
				postalCode: "56068",
				countryCode: "DE",
				vatId: "DE123456789",
				email: "info@firma.de"
			},

			invoiceDate: "2026-04-01",
			dueDate: "2026-04-15",
			currency: "EUR",

			items: [
				{
					name: "Test",
					description: "",
					quantity: 1,
					unitPrice: 100,
					taxRate: 19,
					netTotal: 100,
					taxAmount: 19,
					grossTotal: 119
				}
			],

			netTotal: 100,
			taxAmount: 19,
			grossTotal: 119,

			openAmount: 119,
			paidAmount: 0,
			paymentStatus: "unpaid",
			status: "draft",

			payments: [],

			createdAt: "2026-04-18T08:50:55.503Z",
			updatedAt: "2026-04-18T08:50:55.503Z"
		}
	],

	ui: {
		isDemo: true,
		showDemoBanner: true
	}
};
