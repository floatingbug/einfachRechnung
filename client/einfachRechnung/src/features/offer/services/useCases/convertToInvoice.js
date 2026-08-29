import {offerApi} from "../../api";

export async function convertToInvoice({offerNumber}){
	const invoiceNumber = offerApi.convertToInvoice({offerNumber});

	return invoiceNumber;
}
