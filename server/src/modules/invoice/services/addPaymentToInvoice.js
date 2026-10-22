const model = require("../models");
const { mapToClientInvoice } = require("../mappers");
const { roundCurrency } = require("../../../utils");

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

module.exports = async ({
	userId,
	invoiceId,
	amount,
	paidAt,
	method,
	reference,
}) => {
	const invoice = await model.getInvoiceById({ invoiceId, userId });

	if (!invoice) {
		throw createError(404, "Invoice not found");
	}

	if (invoice.status === "cancelled") {
		throw createError(400, "Cancelled invoices cannot receive payments");
	}

	if (invoice.status === "draft") {
		throw createError(400, "Draft invoices cannot receive payments");
	}

	const grossTotal = Number(invoice.totals?.totalGross ?? 0);
	const currentPaidAmount = Number(invoice.payment?.paidAmount ?? 0);
	const currentOpenAmount = Number(
		invoice.payment?.openAmount ?? grossTotal - currentPaidAmount
	);

	if (!Number.isFinite(amount) || amount <= 0) {
		throw createError(400, "Payment amount must be greater than zero");
	}

	if (amount > currentOpenAmount) {
		throw createError(400, "Payment amount cannot exceed the open amount");
	}

	const paymentAmount = roundCurrency(amount);
	const nextPaidAmount = roundCurrency(currentPaidAmount + paymentAmount);
	const nextOpenAmount = roundCurrency(Math.max(0, grossTotal - nextPaidAmount));
	const paymentStatus = getPaymentStatus(nextPaidAmount, grossTotal);

	const payment = {
		amount: paymentAmount,
		paidAt,
		method: method || "",
		reference: reference || "",
	};

	await model.addPaymentToInvoice({
		invoiceId,
		payment,
		paidAmount: nextPaidAmount,
		openAmount: nextOpenAmount,
		paymentStatus,
	});

	const updatedInvoice = await model.getInvoiceById({ invoiceId, userId });

	return mapToClientInvoice(updatedInvoice);
};
