import {services} from "../../services/";


export async function sendInvoiceByEmail({invoiceNumber}){
	const result = await services.sendInvoiceByEmail({
		invoiceNumber,
	});

	return result;
}
