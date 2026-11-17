const {getDb, ObjectId} = require("../../../db/mongo");


// Reserves the next invoice number and returns the previous value, so every
// caller gets a unique number even with concurrent requests.
module.exports = async ({userId}) => {
    const db = getDb();

    const result = await db.collection("settings").findOneAndUpdate(
        {userId: new ObjectId(userId)},
        {$inc: {"invoice.nextInvoiceNumber": 1}},
        {returnDocument: "before"}
    );

    const nextInvoiceNumber = result?.invoice?.nextInvoiceNumber;

    if (nextInvoiceNumber == null) {
        const error = new Error("Invoice numbering is not configured.");
        error.status = 500;

        throw error;
    }

    return nextInvoiceNumber;
}
