import {updateInvoice as updateInvoiceService} from "../../services";


export async function updateInvoice({data}){
	const updatedInvoice = await updateInvoiceService({data});

	this.invoice = updatedInvoice;
}
