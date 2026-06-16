import http from "@/shared/api/http.client.js";


async function getCustomers({query} = {}){
	const {data} = await http.get("/customers");

	return data.customers;
}

async function createCustomer({customer}){
	const {data} = await http.post(
		"/customers",
		{
			customer,
		}
	);

	return data.customer;
}

async function updateCustomer({customer}){
	const { data } = await http.patch(
		"/customers",
		{
			customer,
		}
	);

	return data.customer;
}


export const api = {
	getCustomers,
	createCustomer,
	updateCustomer,
};
