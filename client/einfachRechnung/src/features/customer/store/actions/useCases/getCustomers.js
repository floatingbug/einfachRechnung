import {getCustomers as getCustomersService} from "../../../services";


export async function getCustomers({query} = {}){
	this.customers = await getCustomersService({query});

	return this.customers;
}

export async function findCustomers({query = {}} = {}){
	const customers = await getCustomersService({query});
	const search = (query.search ?? query.email ?? "").trim().toLocaleLowerCase();

	return search
		? customers.filter(customer => `${customer.name} ${customer.email}`.toLocaleLowerCase().includes(search))
		: customers;
}
