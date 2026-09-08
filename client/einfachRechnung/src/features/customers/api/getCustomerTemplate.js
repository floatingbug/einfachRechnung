import {http} from "@/shared/api";


export async function getCustomerTemplate(){
	const {data} = await http.get(
		"/customers/get-customer-template"
	);

	return data;
};
