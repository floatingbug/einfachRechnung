const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({invoiceNumber, userId}) => {
    const db = getDb();
    const filter = {
        userId: new ObjectId(userId),
        invoiceNumber,
    };

    const invoice = await db.collection("invoices")
        .findOne(filter);

    return invoice;
}
