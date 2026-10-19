import customerApi from "../api";


export async function getCustomers({limit, page, sort, filter}){
	const params = new URLSearchParams({
		limit,
		page,
	});

	if (filter) {
		const filterQuery = filter
			.map(f => `${f.field}:${f.value}`)
			.join(",");

		params.set("filter", filterQuery);
	}

	if(sort){
		const value = `${sort.sortField}:${sort.sortOrder}`;

		params.set("sort", value);
	}

	const customers = await customerApi.getCustomers({
		params,
	});

	return customers;
}
