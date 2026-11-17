const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({invoiceDocument, userId, customerId, invoiceNumber}) => {
	if (!invoiceNumber) {
		throw new Error("invoiceNumber is required");
	}

	const db = getDb();

	const insertDocument = {
		invoiceNumber,
		userId: new ObjectId(userId),
		customerId: new ObjectId(customerId),
		...invoiceDocument,
	};

	const result = await db.collection("invoices").insertOne(insertDocument);

	return {
		invoiceNumber,
		...result,
	};
};
