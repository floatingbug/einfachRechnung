const {getDb, ObjectId} = require("../../../db/mongo");
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

module.exports = async (params) => {
	const db = getDb();
    const limit = params.limit ?? DEFAULT_LIMIT;
    const page = params.page ?? DEFAULT_PAGE;
    const userId = params.userId;
	
    const filter = {
        userId: new ObjectId(userId),
    };

	const skip = (page - 1) * limit;

    const items = await db.collection("invoices")
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();

    const total = await db.collection("invoices")
        .countDocuments(filter);

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
