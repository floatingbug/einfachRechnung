import services from "../../services";


export async function getCustomers(){
	const customers = await services.getCustomers();

	return customers;
}
