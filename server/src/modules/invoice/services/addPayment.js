const model = require("../models");

function roundCurrency(value){
	return Math.round((value + Number.EPSILON) * 100) / 100;
}

function createError(status, message){
	const error = new Error(message);
	error.status = status;

	return error;
}

function getPaymentStatus(paidAmount, grossTotal){
	if (paidAmount <= 0) {
		return "unpaid";
	}

	if (paidAmount < grossTotal) {
		return "partial";
	}

	return "paid";
}

function getInvoiceStatus({ currentStatus }){
	if (currentStatus === "cancelled") {
		return "cancelled";
	}

	if (currentStatus === "draft") {
		return "draft";
	}

	return "sent";
}

module.exports = async ({
	invoiceId,
	amount,
	paidAt,
	method,
	reference,
}) => {
	const invoice = await model.findById({ invoiceId });

	if (!invoice) {
		throw createError(404, "Invoice not found");
	}

	if (invoice.status === "cancelled") {
		throw createError(400, "Cancelled invoices cannot receive payments");
	}

	if (invoice.status === "draft") {
		throw createError(400, "Draft invoices cannot receive payments");
	}

	const nextPaidAmount = roundCurrency(invoice.paidAmount + amount);

	if (nextPaidAmount > invoice.grossTotal) {
		throw createError(400, "Paid amount cannot exceed grossTotal");
	}

	const payment = {
		amount: roundCurrency(amount),
		paidAt,
		method: method || "",
		reference: reference || "",
	};

	await model.addPayment({
		invoiceId,
		payment,
		paidAmount: nextPaidAmount,
		openAmount: roundCurrency(invoice.grossTotal - nextPaidAmount),
		paymentStatus: getPaymentStatus(nextPaidAmount, invoice.grossTotal),
	});

	const nextStatus = getInvoiceStatus({
		currentStatus: invoice.status,
		dueDate: invoice.dueDate,
		paidAmount: nextPaidAmount,
		grossTotal: invoice.grossTotal,
	});

	await model.updateStatus({
		invoiceId,
		status: nextStatus,
	});

	return model.findById({ invoiceId });
};
