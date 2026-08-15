import {getCustomers} from "./getCustomers.js";

export async function findCustomerService({
	email = "",
} = {}){
	if(!email){
		return null;
	}

	const customers = await getCustomers({query: {email}});
	return customers.find(customer => customer.email.toLocaleLowerCase() === email.toLocaleLowerCase()) ?? null;
}
