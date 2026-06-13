import {getCustomers as getCustomersService} from "../../../services";


export async function getCustomers({query} = {}){
	this.customers = await getCustomersService({query});

	return this.customers;
}
