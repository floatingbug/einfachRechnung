import {services} from "../../services";


export async function createInvoice(form){
	const result = await services.create(form);

	return result;
}
