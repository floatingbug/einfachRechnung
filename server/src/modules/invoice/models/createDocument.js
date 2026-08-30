const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({
    userId,
    invoiceId,
    type,
    storageKey,
    contentHash,
}) => {
    const db = getDb();

    const document = {
        userId: new ObjectId(userId),
        invoiceId,
        type,
        storageKey,
        contentHash,
    };

    const result = await db
        .collection("documents")
        .insertOne(document);

    return {
        ...document,
        _id: result.insertedId,
    };
};
