import {services} from "../../services";

function replaceInvoice(store, invoice){
	const index = store.invoices.findIndex(item => item.id === invoice.id);
	if(index >= 0) store.invoices.splice(index, 1, invoice);
	return invoice;
}

export async function sendInvoice({invoiceId}){
	return replaceInvoice(this, await services.sendInvoice({invoiceId}));
}

export async function cancelInvoice({invoiceId}){
	return replaceInvoice(this, await services.cancelInvoice({invoiceId}));
}

export async function registerPayment({invoiceId, payment, openAmount}){
	return replaceInvoice(this, await services.registerPayment({invoiceId, payment, openAmount}));
}

export async function sendReminder({invoiceId}){
	return replaceInvoice(this, await services.sendReminder({invoiceId}));
}

export async function getInvoicePdf({invoiceId}){
	return services.getInvoicePdf({invoiceId});
}
