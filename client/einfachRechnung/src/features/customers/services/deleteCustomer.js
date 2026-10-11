import customerApi from "../api";


export async function deleteCustomer({customerId}){
	const params = customerId;

	const result = await customerApi.deleteCustomer({
		params,
	});

	return result;
}
