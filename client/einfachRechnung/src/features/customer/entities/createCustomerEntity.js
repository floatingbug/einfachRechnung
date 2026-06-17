export default function createCustomerEntity(customer = {}){
	const DEFAULT_CUSTOMER = {
		userId: "",
		name: "",
		street: "",
		postalCode: "",
		city: "",
		countryCode: "DE",
		phone: "",
		email: "",
		vatId: "",
	};

	return {
		...DEFAULT_CUSTOMER,
		...customer,
	};
}
