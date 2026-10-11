import { http } from "@/shared/api";


export async function deleteCustomer({ params }) {
	const { data } = await http.delete(
		`/customers/${params}`
	);

	return data;
}
