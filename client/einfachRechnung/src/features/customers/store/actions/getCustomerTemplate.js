import {services} from "../../services";


export async function getCustomerTemplate(){
	const customerTemplate = await services.getCustomerTemplate();

	this.customer = customerTemplate;
}
