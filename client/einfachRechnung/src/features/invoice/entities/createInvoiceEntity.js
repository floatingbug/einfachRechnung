const DEFAULT_INVOICE = {
	id: "",
	invoiceNumber: "",
	seller: null,
	customer: null,
	invoiceDate: null,
	dueDate: null,
	currency: "",
	items: [],
	note: "",
	netTotal: 0,
	taxAmount: 0,
	grossTotal: 0,
	paidAmount: 0,
	openAmount: 0,
	paymentStatus: "",
	status: "",
	payments: [],
	createdAt: null,
	updatedAt: null,
};

export default function createInvoiceEntity(invoice = {}){
	return {
		...DEFAULT_INVOICE,
		...invoice,
	};
}
