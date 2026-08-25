import {invoiceApi} from "../api";


export async function updateInvoice({invoiceNumber, invoiceDraft}){
	const invoice = invoiceApi.updateInvoice({
		invoiceNumber,
		invoiceDraft,
	})

	return invoice;
}
