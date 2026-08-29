const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({
    userId,
    invoiceNumber,
    type,
    storageKey,
    contentHash,
}) => {
    const db = getDb();

    const document = {
        userId: new ObjectId(userId),
        invoiceNumber,
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
