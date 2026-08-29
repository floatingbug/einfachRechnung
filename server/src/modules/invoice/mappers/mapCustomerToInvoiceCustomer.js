module.exports = function mapCustomerToInvoiceCustomer(customer) {
	const normalizedCustomer = {
		bank: customer.bank ?? {},
		city: customer.city ?? "",
		countryCode: customer.countryCode ?? "",
		customerNumber: customer.customerNumber ?? "",
		customerType: customer.customerType ?? "",
		email: customer.email ?? "",
		phone: customer.phone ?? "",
		postalCode: customer.postalCode ?? "",
		street: customer.street ?? "",
		vatId: customer.vatId ?? "",
	};

	if (customer.customerType === "company") {
		normalizedCustomer.companyName = customer.companyName ?? "";
		normalizedCustomer.contactPerson = customer.contactPerson ?? "";
	}
	else {
		normalizedCustomer.firstName = customer.firstName ?? "";
		normalizedCustomer.lastName = customer.lastName ?? "";
	}

	return normalizedCustomer;
};
