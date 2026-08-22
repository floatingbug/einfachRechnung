import {services} from "../../services";


export async function createInvoice({invoice, customerId}){
	const invoiceNumber = await services.createInvoice({invoice, customerId});

	return invoiceNumber;
}
