import {customerApi} from "../api";
import {mapCustomerDtoToEntity} from "../mappers";


export async function updateCustomer({customer}){
	try{
		const updatedCustomer = await customerApi.updateCustomer({
			customer,
		});

		return {
			success: true,
			customer: mapCustomerDtoToEntity(updatedCustomer),
		};
	}
	catch(error){
		return {
			success: false,
			type: "server",
			errors: error.response?.data?.errors || {},
		};
	}
}
