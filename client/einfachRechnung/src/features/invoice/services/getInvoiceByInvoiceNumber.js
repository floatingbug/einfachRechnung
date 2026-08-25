import {invoiceApi} from "../api";
import {mapInvoiceToInvoiceDraft} from "../mappers";


export async function getInvoiceByInvoiceNumber({invoiceNumber}){
	const invoice = await invoiceApi.getInvoiceByInvoiceNumber({
		invoiceNumber
	});

	const invoiceDraft = mapInvoiceToInvoiceDraft({
		invoice,
	});

	return {
		invoice,
		invoiceDraft,
	};
}
