const { getDb } = require("../../../db/mongo");

module.exports = async ({ status, customerName, page, limit }) => {
	const db = getDb();

	const filter = {};

	if (status) {
		filter.status = status;
	}

	if (customerName) {
		filter["customer.name"] = {
			$regex: customerName,
			$options: "i",
		};
	}

	const skip = (page - 1) * limit;

	const [items, total] = await Promise.all([
		db.collection("invoices")
			.find(filter)
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit)
			.toArray(),
		db.collection("invoices").countDocuments(filter),
	]);

	return {
		items,
		pagination: {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit),
		},
	};
};
