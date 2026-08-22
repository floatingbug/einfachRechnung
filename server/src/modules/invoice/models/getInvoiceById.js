const { ObjectId } = require("mongodb");
const { getDb } = require("../../../db/mongo");

module.exports = async ({ invoiceId }) => {
	const db = getDb();

	const filter = {
		_id: new ObjectId(invoiceId),
	};

	return db.collection("invoices").findOne(filter);
};
