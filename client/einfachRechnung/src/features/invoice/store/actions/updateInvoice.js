import {services} from "../../services";


export async function updateInvoice({invoiceNumber}){
	const invoice = await services.updateInvoice({
		invoiceNumber,
		invoiceDraft: this.invoiceDraft,
	});

	return invoice;
}
