const {getDb, ObjectId} = require("../../../db/mongo");
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

module.exports = async ({userId, limit, page, customerId}) => {
	const db = getDb();
    limit = limit ?? DEFAULT_LIMIT;
    page = page ?? DEFAULT_PAGE;
	
    const filter = {
        userId: new ObjectId(userId),
    };

    if(customerId){
        filter.customerId = new ObjectId(customerId);
    }

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
