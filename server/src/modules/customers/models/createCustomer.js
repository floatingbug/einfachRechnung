const { ObjectId } = require("../../../db/mongo");
const {getDb} = require("../../../db/mongo");


module.exports = async ({userId, customer}) => {
    const db = getDb();
    const document = {
        userId: new ObjectId(userId),
        ...customer,
    }

    const result = await db.collection("customers")
        .insertOne(document);

    return result;
};
