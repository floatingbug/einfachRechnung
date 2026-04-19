export default function mapInvoiceEntityToTableItem(invoice = {}){
	return {
		id: invoice.id || "",
		invoiceNumber: invoice.invoiceNumber || "",
		customer: invoice.customer?.name || "",
		invoiceDate: invoice.invoiceDate || null,
		dueDate: invoice.dueDate || null,
		grossTotal: invoice.grossTotal || 0,
		openAmount: invoice.openAmount || 0,
		paymentStatus: invoice.paymentStatus || "",
		status: invoice.status || "",
	};
}
