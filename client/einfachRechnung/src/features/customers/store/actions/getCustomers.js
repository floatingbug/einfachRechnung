import services from "../../services";


export async function getCustomers({limit, page, sort, filter} = {}){
	const customers = await services.getCustomers({
		limit: limit ?? null,
		page: page ?? 0,
		sort: sort ?? null,
		filter: filter ?? null,
	});

	return customers;
}
