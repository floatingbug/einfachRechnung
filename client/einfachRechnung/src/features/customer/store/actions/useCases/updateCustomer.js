import {updateCustomer as updateCustomerService} from "../../../services";


export async function updateCustomer(){
	const result = await updateCustomerService({
		customer: this.editCustomer,
	});

	if(result.success){
		const index = this.customers.findIndex(customer => customer.id === result.customer.id);
		if(index >= 0) this.customers.splice(index, 1, result.customer);
		this.selectedCustomer = result.customer;
		this.editCustomer = structuredClone(result.customer);
	}
	return result;
}
