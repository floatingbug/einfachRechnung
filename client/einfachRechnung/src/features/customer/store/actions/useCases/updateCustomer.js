import {updateCustomer as updateCustomerService} from "../../../services";


export async function updateCustomer(){
	const result = await updateCustomerService({
		customer: this.editCustomer,
	});


	return result;
}
