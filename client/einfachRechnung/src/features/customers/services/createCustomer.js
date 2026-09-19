import customerApi from "../api";


export async function createCustomer({customer}){
	const customerId = await customerApi.createCustomer({
		customer,
	})

	return customerId;
}
