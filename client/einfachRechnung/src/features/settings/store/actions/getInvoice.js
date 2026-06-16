import {services} from "../../services";


export async function getInvoice(){
	const Invoice = await services.getInvoice();

	this.invoice = Invoice;
};
