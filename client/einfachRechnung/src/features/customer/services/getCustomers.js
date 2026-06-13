import {mapCustomerDtosToEntities} from "../mappers";
import {customerApi} from "../api";


export async function getCustomers({query} = {}){
	const customers = await customerApi.getCustomers({query});

	return mapCustomerDtosToEntities(customers);
}
