import services from "../../services";


export async function createCustomer({customer}){
	const customerId = await services.createCustomer({
		customer,
	});

	return customerId;
}
