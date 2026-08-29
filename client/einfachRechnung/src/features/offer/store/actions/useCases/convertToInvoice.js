import {services} from "../../../services";

export async function convertToInvoice({offerNumber}){
	const invoiceNumber = await services.convertToInvoice({offerNumber});

	return invoiceNumber;
}

