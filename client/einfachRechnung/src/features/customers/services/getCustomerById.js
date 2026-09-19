import customerApi from "../api";


export async function getCustomerById({customerId}){
	const customer = await customerApi.getCustomerById({
		customerId,
	});

	return customer;
}
