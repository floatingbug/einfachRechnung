const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, invoiceNumber, invoiceDraft}) => {
    const db = getDb();
    const filter = {
        userId: new ObjectId(userId),
        invoiceNumber,
    };
    const updateDoc = {
        $set: {
            ...invoiceDraft,
        },
    };

    const result = await db.collection("invoices")
        .updateOne(filter, updateDoc);

    return result;
};

