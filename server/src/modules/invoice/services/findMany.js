const model = require("../models");

module.exports = async ({ status, customerName, page, limit }) => {
	return model.findMany({
		status,
		customerName,
		page,
		limit,
	});
};
