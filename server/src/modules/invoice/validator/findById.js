const validator = require("validator");

module.exports = async (req, res, next) => {
	const { invoiceId } = req.params;

	if (typeof invoiceId !== "string") {
		return res.status(400).json({
			error: "invoiceId must be a string",
		});
	}

	if (!validator.isMongoId(invoiceId)) {
		return res.status(400).json({
			error: "invoiceId must be a valid MongoDB ObjectId",
		});
	}

	return next();
};
