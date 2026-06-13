import { createCustomer as createCustomerService } from "../../../services";

export async function createCustomer(){
	const result = await createCustomerService({
		draftCustomer: this.draftCustomer,
		existingCustomers: this.customers,
	});

	if(!result.success){
		this.errors = result.errors;

		return {
			...result,
		};
	}

	this.customers.push(result.customer);

	return {
		success: true,
		customer: result.customer,
		customers: this.customers,
	};
}
