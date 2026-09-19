import {services} from "../../services";


export async function getInvoices({limit, page, customerName, status, customerId}){
	const result = await services.getInvoices({
		limit,
		page,
		customerName,
		status,
		customerId,
	});

	this.invoices = result.invoices;
	this.pagination = result.pagination;

	return result;
}
