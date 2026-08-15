const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, offerNumber}) => {
    const db = getDb();

    const filter = {
        userId: new ObjectId(userId),
        offerNumber,
    };

    const result = await db
        .collection("offers")
        .deleteOne(filter);

    return result;
};
