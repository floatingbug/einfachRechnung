import services from "../../services";


export async function getCustomers({limit, page} = {}){
	const customers = await services.getCustomers({
		limit: limit ?? null,
		page: page ?? 0,
	});

	return customers;
}
