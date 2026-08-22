module.exports = (invoice) => {
	return {
		id: invoice._id.toString(),

		invoiceNumber: invoice.invoiceNumber,

		customer: invoice.customer,
		seller: invoice.seller,

		invoiceDate: invoice.invoiceDate,
		dueDate: invoice.dueDate,

		currency: invoice.currency,

		items: invoice.items,

		totals: invoice.totals,

		payment: invoice.payment,

		note: invoice.note,

		status: invoice.status,
	};
};
