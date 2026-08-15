import {services} from "../../services";


export async function createInvoice(form){
	const result = await services.createInvoice(form);
	this.invoices.unshift(result);

	return result;
}
