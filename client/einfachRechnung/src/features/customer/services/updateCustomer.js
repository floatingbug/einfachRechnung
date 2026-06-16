import {customerApi} from "../api";


export async function updateCustomer({customer}){
	try{
		const updatedCustomer = await customerApi.updateCustomer({
			customer,
		});

		return {
			success: true,
			customer: updateCustomer,
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
