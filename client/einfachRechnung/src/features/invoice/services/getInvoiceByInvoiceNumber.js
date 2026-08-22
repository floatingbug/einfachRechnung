import {invoiceApi} from "../api";


export async function getInvoiceByInvoiceNumber({invoiceNumber}){
	const invoice = await invoiceApi.getInvoiceByInvoiceNumber({
		invoiceNumber
	});

	return invoice;
}
