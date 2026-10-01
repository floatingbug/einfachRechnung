import customerApi from "../api";


export async function getCustomers({limit, page}){
	const params = new URLSearchParams({
		limit,
		page,
	});

	const customers = await customerApi.getCustomers({
		params,
	});

	return customers;
}
