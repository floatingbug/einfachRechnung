import {services} from "../services";


export async function deleteInvoice(){
	await services.deleteInvoice({
		invoiceId: this.invoice.id,
	});
}
