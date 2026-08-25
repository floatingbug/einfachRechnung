import {services} from "../../services";


export async function getInvoiceByInvoiceNumber({invoiceNumber}){
	const result = await services.getInvoiceByInvoiceNumber({invoiceNumber});

	this.invoice = result.invoice;
	this.invoiceDraft = result.invoiceDraft;

	return this.invoice;
}
