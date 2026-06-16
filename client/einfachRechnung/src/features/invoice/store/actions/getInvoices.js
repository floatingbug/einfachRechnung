import {services} from "../../services";


export async function getInvoices(params){
	const result = await services.findMany(params);
	this.invoices = result.invoices;
	this.pagination = result.pagination;
}
