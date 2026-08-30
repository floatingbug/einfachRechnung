const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({
    userId,
    offerId,
    type,
    storageKey,
    contentHash,
}) => {
    const db = getDb();

    const document = {
        userId: new ObjectId(userId),
        offerId: new ObjectId(offerId),
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
