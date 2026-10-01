import customerApi from "../api";


export async function updateCustomer({customer}){
	await customerApi.updateCustomer({payload: customer});
}
