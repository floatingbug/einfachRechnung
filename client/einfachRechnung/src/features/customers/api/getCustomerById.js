import {http} from "@/shared/api";


export async function getCustomerById({customerId}){
	const {data} = await http.get(
		`/customers/${customerId}`
	);

	return data;
}
