import { invoiceApi } from "../api";


export async function sendInvoiceByEmail({invoiceNumber}){
	const result = await invoiceApi.sendInvoiceByEmail({
		params: invoiceNumber,
	});

	return result;
}
