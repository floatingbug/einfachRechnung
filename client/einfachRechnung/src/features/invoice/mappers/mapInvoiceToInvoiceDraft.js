export function mapInvoiceToInvoiceDraft({invoice}){
	const invoiceDraft = {
		invoiceDate: invoice.invoiceDate,
		dueDate: invoice.dueDate,
		currency: invoice.currency,

		items: structuredClone(invoice.items),

		note: invoice.note,

		payment: invoice.payment,
	}

	return invoiceDraft;
}
