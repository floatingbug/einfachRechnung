export function isInvoicePaid(invoice){
	return invoice.paidAmount >= invoice.grossTotal;
}

export function isInvoicePartiallyPaid(invoice){
	return invoice.paidAmount > 0 && !isInvoicePaid(invoice);
}
export function canSendReminder(invoice = {}){
	return invoice.status === "sent" && invoice.openAmount > 0 && invoice.dueDate && new Date(invoice.dueDate) < new Date();
}
