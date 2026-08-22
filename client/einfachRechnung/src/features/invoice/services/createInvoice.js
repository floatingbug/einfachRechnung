import {invoiceApi} from "../api";


export default async function createInvoice({invoice, customerId}){
	const invoiceNumber = await invoiceApi.createInvoice({invoice, customerId});

	return invoiceNumber;
}
