const model = require("../models");

function createError(status, message){
	const error = new Error(message);
	error.status = status;

	return error;
}

module.exports = async ({userId, invoiceNumber }) => {
	const invoice = await model.getInvoiceByInvoiceNumber({
        invoiceNumber,
        userId,
    });

	if (!invoice) {
		throw createError(404, "Rechnung nicht gefunden.");
	}

	if (invoice.paymentStatus === "paid") {
		throw createError(400, "Bezahlte Rechnungen können nicht Stoniert werden.");
	}

	if (invoice.status === "cancelled") {
		throw createError(400, "Rechnungen bereits Stoniert.");
	}

	await model.updateInvoiceStatus({
		invoiceNumber,
		status: "cancelled",
	});

	return model.getInvoiceByInvoiceNumber({ 
        invoiceNumber,
    });
};
