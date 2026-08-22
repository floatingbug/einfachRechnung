const { ObjectId } = require("mongodb");
const { getDb } = require("../../../db/mongo");

module.exports = async ({ invoiceId, status }) => {
	const db = getDb();

	const filter = {
		_id: new ObjectId(invoiceId),
	};

	const updateDocument = {
		$set: {
			status,
			updatedAt: new Date(),
		},
	};

	return db.collection("invoices").updateOne(filter, updateDocument);
};
