const { ObjectId } = require("mongodb");
const { getDb } = require("../../../db/mongo");

module.exports = async ({ invoiceId, userId }) => {
	const db = getDb();

	const filter = {
		_id: new ObjectId(invoiceId),
	};

	if (userId) {
		filter.userId = new ObjectId(userId);
	}

	return db.collection("invoices").findOne(filter);
};
