import {http} from "@/shared/api";


export async function createCustomer({customer}){
	const {data} = await http.post(
		"/customers",
		customer,
	);

	return data;
}
