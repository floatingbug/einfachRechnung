const model = require("../models");

function createError(status, message){
	const error = new Error(message);
	error.status = status;

	return error;
}

module.exports = async ({ invoiceId }) => {
	const invoice = await model.findById({ invoiceId });

	if (!invoice) {
		throw createError(404, "Invoice not found");
	}

	if (invoice.paymentStatus === "paid") {
		throw createError(400, "Paid invoices cannot be cancelled");
	}

	if (invoice.status === "cancelled") {
		return invoice;
	}

	await model.updateStatus({
		invoiceId,
		status: "cancelled",
	});

	return model.findById({ invoiceId });
};
