const DEFAULT_INVOICE = {
	invoicePrefix: "",
	invoiceNumberStart: 0,
	invoiceNumberFormat: "",

	defaultPaymentTermsDays: 0,
	defaultDueDays: 0,

	currency: "",
	language: "",

	autoSendEnabled: false,

	defaultTaxRate: 0,
};


export function createInvoiceEntity({invoice} = {}){
	return {
		...DEFAULT_INVOICE,
		...invoice,
	};
};
