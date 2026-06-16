import {services} from "../../services";


export async function updateInvoice({data}){
	const updatedInvoice = await services.updateInvoice({data});

	this.invoice = updatedInvoice;
}
