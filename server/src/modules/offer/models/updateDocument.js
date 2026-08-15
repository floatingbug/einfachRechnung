const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({
    documentId,
    contentHash,
    storageKey,
}) => {
    const db = getDb();

    const filter = {
        _id: new ObjectId(documentId),
    };

    const update = {
        $set: {
            contentHash,
            storageKey,
            updatedAt: new Date(),
        },
    };

    await db
        .collection("documents")
        .updateOne(filter, update);

    return db
        .collection("documents")
        .findOne(filter);
};
