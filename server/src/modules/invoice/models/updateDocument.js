const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({
    documentId,
    contentHash,
    storageKey,
}) => {
    const db = getDb();

    const document = await db
        .collection("documents")
        .findOneAndUpdate(
            {
                _id: new ObjectId(documentId),
            },
            {
                $set: {
                    contentHash,
                    storageKey,
                },
            },
            {
                returnDocument: "after",
            },
        );

    return document;
};
