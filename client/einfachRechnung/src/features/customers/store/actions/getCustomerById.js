import services from "../../services";


export async function getCustomerById({customerId}){
	const customer = await services.getCustomerById({
		customerId
	});

	this.customer = customer;

	return customer;
}
