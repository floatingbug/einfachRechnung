import {invoiceApi} from "../api";
import {mapInvoiceDtoToEntity} from "../mappers";
import {isValidPayment} from "../domainRules/payment.rules.js";

function mapResult(result){
	return mapInvoiceDtoToEntity(result.invoice ?? result.data ?? result);
}

export async function sendInvoice({invoiceId}){
	return mapResult(await invoiceApi.sendInvoice({invoiceId}));
}

export async function cancelInvoice({invoiceId}){
	return mapResult(await invoiceApi.cancelInvoice({invoiceId}));
}

export async function registerPayment({invoiceId, payment, openAmount}){
	const validation = isValidPayment(payment, openAmount);
	if(!validation.valid) throw new Error(validation.error);
	return mapResult(await invoiceApi.registerPayment({invoiceId, payment}));
}

export async function sendReminder({invoiceId}){
	return mapResult(await invoiceApi.sendReminder({invoiceId}));
}

export async function getInvoicePdf({invoiceId}){
	return invoiceApi.getPdf({invoiceId});
}
