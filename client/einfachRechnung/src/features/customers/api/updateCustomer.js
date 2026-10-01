import {http} from "@/shared/api";


export async function updateCustomer({payload}){
	console.log(payload);

	const {data} = await http.put(
		"/customers",
		payload
	);

	return data;
}
