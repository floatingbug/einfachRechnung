import {http} from "@/shared/api";


export async function getCustomers(){
	const {data} = await http.get(
		"/customers"
	);

	return data.customers;
}
