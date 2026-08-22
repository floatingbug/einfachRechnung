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

	if (invoice.status === "cancelled") {
		throw createError(400, "Cancelled invoices cannot be sent");
	}

	if (invoice.status === "paid") {
		throw createError(400, "Paid invoices cannot be sent");
	}

	if (invoice.status === "sent") {
		return invoice;
	}

	if (invoice.status === "overdue") {
		throw createError(400, "Overdue invoices cannot be sent again");
	}

	await model.updateStatus({
		invoiceId,
		status: "sent",
	});

	return model.findById({ invoiceId });
};
