const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, invoiceNumber}) => {
    const db = getDb();

    const filter = {
        userId: new ObjectId(userId),
        invoiceNumber,
        type: "pdf",
    };

    const document = await db
        .collection("documents")
        .findOne(filter);

    return document;
};
