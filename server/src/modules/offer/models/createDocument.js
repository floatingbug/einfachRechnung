const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({
    userId,
    offerNumber,
    type,
    storageKey,
    contentHash,
}) => {
    const db = getDb();

    const document = {
        userId: new ObjectId(userId),
        offerNumber: new ObjectId(offerNumber),
        type,
        storageKey,
        contentHash,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const result = await db
        .collection("documents")
        .insertOne(document);

    return {
        ...document,
        _id: result.insertedId,
    };
};
