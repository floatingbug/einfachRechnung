import {services} from "../../services";


export async function getInvoices(params){
	const result = await services.getInvoices(params);
	this.invoices = result.invoices;
	this.pagination = result.pagination;

	console.log(result);
}
