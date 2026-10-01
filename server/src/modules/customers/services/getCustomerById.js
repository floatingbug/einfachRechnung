const models = require("../models");

module.exports = async ({ customerId }) => {
	const customer = await models.getCustomerById({ customerId });

	if (!customer) {
		const error = new Error("Customer not found");
        error.status = 404;

        throw error;
	}

	const { _id: id, ...customerData } = customer;

	return { id, ...customerData };
};
