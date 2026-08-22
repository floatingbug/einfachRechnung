const DEFAULT_INVOICE = {
	invoiceDate: null,
	dueDate: null,
	items: [],
	note: "",
	paymentMethod: "cash",
};

export default function createInvoiceEntity(invoice = {}){
	return {
		...DEFAULT_INVOICE,
		...invoice,
	};
}
