import invoiceApi from "../api";
import { mapInvoiceDtosToEntities } from "../mappers";

export default async function findMany({
	page = 1,
	status = "",
	customerName = "",
	limit = 20,
} = {}){
	const query = {
		page,
		limit,
	};

	if (customerName){
		query.customerName = customerName;
	}

	if (status){
		query.status = status;
	}

	const result = await invoiceApi.findMany({ query });

	return {
		invoices: mapInvoiceDtosToEntities(result.data.items),
		pagination: result.data.pagination,
	};
}
