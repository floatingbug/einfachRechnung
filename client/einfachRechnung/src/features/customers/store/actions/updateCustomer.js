import services from "../../services";


export async function updateCustomer(){
	await services.updateCustomer({
		customer: this.customer,
	});
}
