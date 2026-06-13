import {customerApi} from "../api";
import {isValidCustomer} from "../domainRules/customer.rules.js";
import {mapCustomerDtoToEntity} from "../mappers";

export async function createCustomer({draftCustomer = {}, existingCustomers = []} = {}){
	// --- validation ---
	const customerValidationResult = isValidCustomer(draftCustomer);

	if(!customerValidationResult.valid){
		return {
			success: false,
			errors: customerValidationResult.errors,
		};
	}

	// --- persist ---
	const customer = await customerApi.createCustomer({
		customer: draftCustomer,
	});

	return {
		success: true,
		customer: mapCustomerDtoToEntity(customer),
	};
}
