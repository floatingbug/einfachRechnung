const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, offerId}) => {
    const db = getDb();

    const filter = {
        userId: new ObjectId(userId),
        offerId: new ObjectId(offerId),
        type: "pdf",
    };

    const document = await db
        .collection("documents")
        .findOne(filter);

    return document;
};
