const DEFAULT_INVOICE = {
	invoicePrefix: "",
	nextInvoiceNumber: 1,
	invoiceNumberFormat: "{prefix}{year}-{number}",

	defaultPaymentTermsDays: 14,

	currency: "EUR",
	language: "de",

	defaultTaxRate: 19,

	autoSendEnabled: false,

	defaultIntroduction:
		"Vielen Dank für Ihren Auftrag.",

	defaultClosing:
		"Vielen Dank für Ihr Vertrauen.\nFür Rückfragen stehen wir Ihnen gerne zur Verfügung.",
};


export function createInvoiceEntity({invoice} = {}){
	return {
		...DEFAULT_INVOICE,
		...invoice,
	};
};
