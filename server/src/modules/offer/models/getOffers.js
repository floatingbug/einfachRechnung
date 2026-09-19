const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, limit, page, customerId}) => {
	const db = getDb();
    limit = limit ?? 10;
    page = page ?? 1;

    const filter = {
        userId: new ObjectId(userId),
    };

    if(customerId){
        filter.customerId = new ObjectId(customerId);
    }

	const skip = (page - 1) * limit;

    const items = await db.collection("offers")
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();

    const total = await db.collection("offers")
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
