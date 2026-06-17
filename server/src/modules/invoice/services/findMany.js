const model = require("../models");

module.exports = async (params) => {
	const result = await model.findMany(params);

    return result;
};
