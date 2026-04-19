const model = require("../models");

module.exports = async ({ invoiceId }) => {
	return model.findById({ invoiceId });
};
