const model = require("../models");

module.exports = async ({ invoiceId }) => {
	return model.getInvoiceById({ invoiceId });
};
