import {invoiceApi} from "../api";
import { mapInvoiceDtosToEntities } from "../mappers";

export async function getInvoices(params){

	const query = new URLSearchParams({
		limit: params.limit || 10,
		page: params.page || 1,
	});

	if (params.customerName){
		query.append("customerName", params.customerName);
	}

	if (params.status){
		query.append("status", params.status);
	}

	const result = await invoiceApi.getInvoices({ query });

	if(!result.items){
		return {
			invoices: [],
			pagination: null,
		};
	}

	return {
		invoices: mapInvoiceDtosToEntities(result.items),
		pagination: result.pagination,
	};
}
