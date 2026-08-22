const model = require("../models");

module.exports = async (params) => {
	const result = await model.getInvoices(params);

    return result;
};
