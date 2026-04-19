const model = require("../models");

function roundCurrency(value){
	return Math.round((value + Number.EPSILON) * 100) / 100;
}

function createError(status, message){
	const error = new Error(message);
	error.status = status;

	return error;
}

function normalizeParty(party){
	return {
		name: party.name,
		street: party.street,
		city: party.city,
		postalCode: party.postalCode,
		countryCode: party.countryCode,
		vatId: party.vatId || "",
		email: party.email || "",
	};
}

function normalizeItems(items){
	return items.map((item) => {
		const netTotal = roundCurrency(item.quantity * item.unitPrice);
		const taxAmount = roundCurrency(netTotal * (item.taxRate / 100));
		const grossTotal = roundCurrency(netTotal + taxAmount);

		return {
			name: item.name,
			description: item.description || "",
			quantity: item.quantity,
			unitPrice: item.unitPrice,
			taxRate: item.taxRate,
			netTotal,
			taxAmount,
			grossTotal,
		};
	});
}

function calculateTotals(items){
	const netTotal = roundCurrency(
		items.reduce((sum, item) => sum + item.netTotal, 0)
	);

	const taxAmount = roundCurrency(
		items.reduce((sum, item) => sum + item.taxAmount, 0)
	);

	const grossTotal = roundCurrency(
		items.reduce((sum, item) => sum + item.grossTotal, 0)
	);

	return {
		netTotal,
		taxAmount,
		grossTotal,
	};
}

module.exports = async ({
	seller,
	customer,
	invoiceDate,
	dueDate,
	currency,
	items,
	note,
}) => {
	if (new Date(dueDate).getTime() < new Date(invoiceDate).getTime()) {
		throw createError(400, "dueDate must be greater than or equal to invoiceDate");
	}

	const normalizedSeller = normalizeParty(seller);
	const normalizedCustomer = normalizeParty(customer);
	const normalizedItems = normalizeItems(items);

	if (!normalizedItems.length) {
		throw createError(400, "Invoice must contain at least one item");
	}

	const totals = calculateTotals(normalizedItems);

	if (totals.grossTotal <= 0) {
		throw createError(400, "Invoice grossTotal must be greater than 0");
	}

	const invoiceDocument = {
		seller: normalizedSeller,
		customer: normalizedCustomer,
		invoiceDate,
		dueDate,
		currency,
		items: normalizedItems,
		note: note || "",
		netTotal: totals.netTotal,
		taxAmount: totals.taxAmount,
		grossTotal: totals.grossTotal,
		paidAmount: 0,
		openAmount: totals.grossTotal,
		paymentStatus: "unpaid",
		status: "draft",
		payments: [],
	};

	return model.create(invoiceDocument);
};
