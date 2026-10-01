const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async({userId}) => {
    const db = getDb();
    const filter = {
        userId: new ObjectId(userId),
    };

    const customerCount = await db.collection("customers")
        .countDocuments(filter);

    return customerCount;
}

