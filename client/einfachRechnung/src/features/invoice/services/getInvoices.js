import {invoiceApi} from "../api";
import { mapInvoiceDtosToEntities } from "../mappers";

export async function getInvoices({page, limit, customerName, status, customerId}){

	const query = new URLSearchParams({
		limit: limit || 10,
		page: page || 1,
	});

	if (customerName){
		query.append("customerName", customerName);
	}

	if (status){
		query.append("status", status);
	}

	if(customerId){
		query.append("customerId", customerId);
	}

	const result = await invoiceApi.getInvoices({ query });

	if(!result.invoices){
		return {
			invoices: [],
			pagination: null,
		};
	}

	return {
		invoices: mapInvoiceDtosToEntities(result.invoices),
		pagination: result.pagination,
	};
}
