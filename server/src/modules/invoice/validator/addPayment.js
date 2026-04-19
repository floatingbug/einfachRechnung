const validator = require("validator");

module.exports = async (req, res, next) => {
	const { invoiceId } = req.params;
	const payload = req.body;

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

	if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
		return res.status(400).json({
			error: "Invalid request body",
		});
	}

	const allowedKeys = ["amount", "paidAt", "method", "reference"];
	const keys = Object.keys(payload);

	if (keys.length === 0) {
		return res.status(400).json({
			error: "No payment data provided",
		});
	}

	for (const key of keys) {
		if (!allowedKeys.includes(key)) {
			return res.status(400).json({
				error: `Field '${key}' is not allowed`,
			});
		}
	}

	if (!("amount" in payload)) {
		return res.status(400).json({
			error: "amount is required",
		});
	}

	if (typeof payload.amount !== "number" || !Number.isFinite(payload.amount)) {
		return res.status(400).json({
			error: {
				type: "amount",
				message: "Amount must be a valid number.",
			},
		});
	}

	if (!validator.isFloat(String(payload.amount), { gt: 0 })) {
		return res.status(400).json({
			error: {
				type: "amount",
				message: "Amount must be greater than 0.",
			},
		});
	}

	if (!("paidAt" in payload)) {
		return res.status(400).json({
			error: "paidAt is required",
		});
	}

	if (typeof payload.paidAt !== "string") {
		return res.status(400).json({
			error: {
				type: "paidAt",
				message: "paidAt must be of type string.",
			},
		});
	}

	payload.paidAt = payload.paidAt.trim();

	if (!validator.isDate(payload.paidAt, { format: "YYYY-MM-DD", strictMode: true })) {
		return res.status(400).json({
			error: {
				type: "paidAt",
				message: "paidAt must be a valid date in YYYY-MM-DD format.",
			},
		});
	}

	if ("method" in payload) {
		if (typeof payload.method !== "string") {
			return res.status(400).json({
				error: {
					type: "method",
					message: "method must be of type string.",
				},
			});
		}

		payload.method = payload.method.trim();

		if (!validator.isLength(payload.method, { min: 0, max: 50 })) {
			return res.status(400).json({
				error: {
					type: "method",
					message: "method must be between 0 and 50 characters long.",
				},
			});
		}
	}

	if ("reference" in payload) {
		if (typeof payload.reference !== "string") {
			return res.status(400).json({
				error: {
					type: "reference",
					message: "reference must be of type string.",
				},
			});
		}

		payload.reference = payload.reference.trim();

		if (!validator.isLength(payload.reference, { min: 0, max: 100 })) {
			return res.status(400).json({
				error: {
					type: "reference",
					message: "reference must be between 0 and 100 characters long.",
				},
			});
		}
	}

	return next();
};
