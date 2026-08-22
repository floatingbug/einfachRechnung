const {getDb, ObjectId} = require("../../../db/mongo");
const {buildInvoiceNumber} = require("../../../utils");


module.exports = async ({invoiceDocument, userId, customerId}) => {
	const db = getDb();
    const invoiceNumber = buildInvoiceNumber();
    const insertDocument = {
        invoiceNumber,
        userId: new ObjectId(userId),
        customerId: new ObjectId(customerId),
        ...invoiceDocument,
    }

	const result = await db.collection("invoices").insertOne(insertDocument);

	return {
        invoiceNumber,
        ...result
    };
};
