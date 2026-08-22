const invoiceModels = require("../models");
const settingsModels = require("../../settings/models");
const customersModels = require("../../customers/models");
const {calculateTotals} = require("../../../utils");


module.exports = async ({invoice, customerId, userId}) => {
	// --- customer ---
	const customer = await customersModels.getCustomerById({
		customerId,
	});

	const normalizedCustomer = {
		bank: customer.bank ?? {},
		city: customer.city ?? "",
		countryCode: customer.countryCode ?? "",
		customerNumber: customer.customerNumber ?? "",
		customerType: customer.customerType ?? "",
		email: customer.email ?? "",
		phone: customer.phone ?? "",
		postalCode: customer.postalCode ?? "",
		street: customer.street ?? "",
		vatId: customer.vatId ?? "",
	};

	if (customer.customerType === "company") {
		normalizedCustomer.companyName = customer.companyName ?? "";
		normalizedCustomer.contactPerson = customer.contactPerson ?? "";
	}
	else {
		normalizedCustomer.firstName = customer.firstName ?? "";
		normalizedCustomer.lastName = customer.lastName ?? "";
	}

	// --- seller ---
	const companySettings = await settingsModels.getSettings({
		userId,
		type: "company",
	});

	const normalizedSeller = {
        bank: companySettings.bank ?? {},
		companyName: companySettings.companyName ?? "",
		ownerName: companySettings.ownerName ?? "",
		email: companySettings.email ?? "",
		phone: companySettings.phone ?? "",
		website: companySettings.website ?? "",
		street: companySettings.street ?? "",
		postalCode: companySettings.postalCode ?? "",
		city: companySettings.city ?? "",
		countryCode: companySettings.countryCode ?? "",
	};

	// --- totals ---
	const totals = calculateTotals(invoice.items);

	// --- invoice document ---
	const invoiceDocument = {
		seller: normalizedSeller,

		customer: normalizedCustomer,

		invoiceDate: new Date(invoice.invoiceDate),
		dueDate: new Date(invoice.dueDate),

		currency: invoice.currency ?? "EUR",

		items: invoice.items,

		totals,

		payment: {
			paidAmount: 0,
			openAmount: totals.totalGross,
			status: "unpaid",
			method: invoice.paymentMethod ?? "",
			payments: [],
		},

		note: invoice.note ?? "",

		status: "draft",
	};

	// --- save ---
	const result = await invoiceModels.createInvoice({
		invoiceDocument,
		userId,
		customerId,
	});

	if (!result.insertedId) {
		throw new Error("Rechnung konnte nicht gespeichert werden.");
	}

	return {
		invoiceNumber: result.invoiceNumber,
	};
};
