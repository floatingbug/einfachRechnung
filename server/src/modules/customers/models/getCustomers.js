const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, limit, page}) => {
    const db = getDb();
    const filter = {
        userId: new ObjectId(userId),
    };
    const skip = limit * page;

    const customers = await db.collection("customers")
        .find(filter)
        .sort({createdAd: -1})
        .skip(skip)
        .limit(limit)
        .toArray();

    const total = await db.collection("customers")
        .countDocuments(filter);

    return {
        customers,
        pagination: {
            limit,
            page,
            total,
            totalPages: Math.ceil(total / limit)
        }
    }
};
