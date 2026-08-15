const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, offerNumber}) => {
    const db = getDb();

    const filter = {
        userId: new ObjectId(userId),
        offerNumber,
        type: "pdf",
    };

    const document = await db
        .collection("documents")
        .findOne(filter);

    return document;
};
