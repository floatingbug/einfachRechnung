import {services} from "../../services";


export async function updateInvoice({invoiceSettings}){
	const updatedInvoice = await services.updateInvoice({invoiceSettings});

	this.invoice = updatedInvoice;
}
