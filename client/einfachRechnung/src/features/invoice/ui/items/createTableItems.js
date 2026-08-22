export function createTableItems(invoices) {
	return invoices.map((invoice) => ({
		id: invoice.id,
		invoiceNumber: invoice.invoiceNumber,

		customer: invoice.customer.name,

		invoiceDate: invoice.invoiceDate,
		dueDate: invoice.dueDate,

		grossTotal: invoice.grossTotal,
		openAmount: invoice.openAmount,

		paymentStatus: invoice.paymentStatus,
		status: invoice.status,
	}));
}
