const { ObjectId } = require("mongodb");
const { getDb } = require("../../../db/mongo");

module.exports = async ({
	invoiceId,
	payment,
	paidAmount,
	openAmount,
	paymentStatus,
}) => {
	const db = getDb();

	const filter = {
		_id: new ObjectId(invoiceId),
	};

	const updateDocument = {
		$push: {
			payments: {
				...payment,
				createdAt: new Date(),
			},
		},
		$set: {
			paidAmount,
			openAmount,
			paymentStatus,
			updatedAt: new Date(),
		},
	};

	return db.collection("invoices").updateOne(filter, updateDocument);
};
