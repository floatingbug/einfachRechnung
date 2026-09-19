import customerApi from "../api";


export async function getCustomers(){
	const customers = await customerApi.getCustomers();

	return customers;
}
