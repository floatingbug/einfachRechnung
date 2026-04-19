const {getDb} = require("../../../db/mongo");


function buildInvoiceNumber(){
	const now = new Date();
	const year = now.getUTCFullYear();
	const random = Math.floor(100000 + Math.random() * 900000);

	return `INV-${year}-${random}`;
}

module.exports = async (invoiceDocument) => {
	const db = getDb();

	const insertDocument = {
		invoiceNumber: buildInvoiceNumber(),
		seller: invoiceDocument.seller,
		customer: invoiceDocument.customer,
		invoiceDate: invoiceDocument.invoiceDate,
		dueDate: invoiceDocument.dueDate,
		currency: invoiceDocument.currency,
		items: invoiceDocument.items,
		note: invoiceDocument.note,
		netTotal: invoiceDocument.netTotal,
		taxAmount: invoiceDocument.taxAmount,
		grossTotal: invoiceDocument.grossTotal,
		paidAmount: invoiceDocument.paidAmount,
		openAmount: invoiceDocument.openAmount,
		paymentStatus: invoiceDocument.paymentStatus,
		status: invoiceDocument.status,
		payments: invoiceDocument.payments,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const result = await db.collection("invoices").insertOne(insertDocument);

	const filter = {
		_id: result.insertedId,
	};

	return db.collection("invoices").findOne(filter);
};
