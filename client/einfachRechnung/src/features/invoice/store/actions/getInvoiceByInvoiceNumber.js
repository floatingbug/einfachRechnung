import {services} from "../../services";


export async function getInvoiceByInvoiceNumber({invoiceNumber}){
	const invoice = await services.getInvoiceByInvoiceNumber({invoiceNumber});

	return invoice;
}
