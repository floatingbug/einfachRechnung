import {invoiceApi} from "../api";


export async function cancelInvoice({invoiceNumber}){
	await invoiceApi.cancelInvoice({
		invoiceNumber,
	});
}
