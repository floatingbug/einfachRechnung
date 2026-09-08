import {customersApi} from "../api";


export async function getCustomerTemplate(){
	const customerTemplate = await customersApi.getCustomerTemplate();

	return customerTemplate;
}
