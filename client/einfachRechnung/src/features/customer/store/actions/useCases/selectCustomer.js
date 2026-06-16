export function selectCustomer({ customerId }){
	const customer = this.customers.find(
		customer => customer.id === customerId
	);

	if (!customer){
		this.selectedCustomer = null;
		this.editCustomer = null;

		return;
	}

	this.selectedCustomer = customer;
	this.editCustomer = JSON.parse(
		JSON.stringify(customer)
	);
}
