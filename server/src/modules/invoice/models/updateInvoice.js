const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, invoiceNumber, invoice}) => {
    const db = getDb();
    const filter = {
        userId: new ObjectId(userId),
        invoiceNumber,
    };
    const updateDoc = {
        $set: {
            ...invoice,
        },
    };

    const result = await db.collection("invoices")
        .updateOne(filter, updateDoc);

    return result;
};

