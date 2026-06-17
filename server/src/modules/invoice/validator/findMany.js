const validator = require("validator");

module.exports = async (req, res, next) => {
	const query = req.query;
    console.log(query);
	const allowedKeys = ["status", "customerName", "page", "limit"];
	const keys = Object.keys(query);

	for (const key of keys) {
		if (!allowedKeys.includes(key)) {
			return res.status(400).json({
				error: `Query field '${key}' is not allowed`,
			});
		}
	}

	const validatedQuery = {
		status: undefined,
		customerName: undefined,
		page: 1,
		limit: 20,
	};

	if ("status" in query) {
		if (typeof query.status !== "string") {
			return res.status(400).json({
				error: "status must be a string",
			});
		}

		const normalizedStatus = query.status.trim();

		const allowedStatuses = ["draft", "sent", "paid", "overdue", "cancelled"];

		if (!allowedStatuses.includes(normalizedStatus)) {
			return res.status(400).json({
				error: "status is invalid",
			});
		}

		validatedQuery.status = normalizedStatus;
	}

	if ("customerName" in query) {
		if (typeof query.customerName !== "string") {
			return res.status(400).json({
				error: "customerName must be a string",
			});
		}

		const normalizedCustomerName = query.customerName.trim();

		if (!validator.isLength(normalizedCustomerName, { min: 1, max: 100 })) {
			return res.status(400).json({
				error: "customerName must be between 1 and 100 characters",
			});
		}

		validatedQuery.customerName = normalizedCustomerName;
	}

	if ("page" in query) {
		if (typeof query.page !== "string") {
			return res.status(400).json({
				error: "page must be a string",
			});
		}

		if (!validator.isInt(query.page, { min: 1 })) {
			return res.status(400).json({
				error: "page must be an integer greater than 0",
			});
		}

		validatedQuery.page = Number(query.page);
	}

	if ("limit" in query) {
		if (typeof query.limit !== "string") {
			return res.status(400).json({
				error: "limit must be a string",
			});
		}

		if (!validator.isInt(query.limit, { min: 1, max: 100 })) {
			return res.status(400).json({
				error: "limit must be an integer between 1 and 100",
			});
		}

		validatedQuery.limit = Number(query.limit);
	}

	req.validatedQuery = validatedQuery;

	return next();
};
