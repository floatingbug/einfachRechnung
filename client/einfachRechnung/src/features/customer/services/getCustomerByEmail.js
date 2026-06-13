import customerApi from "../api";

export async function findCustomerService({
	email = "",
} = {}){
	if(!email){
		return null;
	}

	const result = await customerApi.findMany({
		query: { email },
	});

	const items = result?.data?.items || [];

	return items.length ? items[0] : null;
}
