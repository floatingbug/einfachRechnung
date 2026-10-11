import services from "../../services";


export async function deleteCustomer({customerId}){
	const result = await services.deleteCustomer({
		customerId,
	})

	return result;
}
