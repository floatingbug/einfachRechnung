import {http} from "@/shared/api";


export async function getCustomers({params}){
	const {data} = await http.get(
		`/customers?${params}`
	);

	return data;
}
