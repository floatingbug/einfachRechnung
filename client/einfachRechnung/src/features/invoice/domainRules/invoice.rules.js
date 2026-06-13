export function isInvoicePaid(invoice){
	return invoice.paidAmount >= invoice.grossTotal;
}

export function isInvoicePartiallyPaid(invoice){
	return invoice.paidAmount > 0 && !isInvoicePaid(invoice);
}
