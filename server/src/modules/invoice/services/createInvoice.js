const invoiceModels = require("../models");
const settingsModels = require("../../settings/models");
const customersModels = require("../../customers/models");
const {mapCustomerToInvoiceCustomer} = require("../mappers");
const {calculateTotals} = require("../../../utils");


module.exports = async ({
	invoice,
	customerId,
	userId,
	customerSnapshot,
}) => {
	// --- customer ---
	let customer;

	if (customerSnapshot) {
		customer = customerSnapshot;
	}
	else {
		customer = await customersModels.getCustomerById({
			customerId,
		});
	}

	const normalizedCustomer =
		mapCustomerToInvoiceCustomer(customer);

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
		vatId: companySettings.vatId ?? null,
		taxNumber: companySettings.taxNumber ?? null,
	};

	// --- totals ---
	const totals = calculateTotals(invoice.items);

	// --- invoice document ---
	const invoiceDocument = {
		seller: normalizedSeller,
		customer: normalizedCustomer,

		invoiceDate: new Date(invoice.invoiceDate),
		dueDate: new Date(invoice.dueDate),
		serviceDate: new Date(invoice.serviceDate),
		taxTreatment: invoice.taxTreatment,

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

    // convertet from offer
    if(invoice.offerId){
        invoiceDocument.source = {
            type: "offer",
            offerId: invoice.offerId,
            offerNumber: invoice.offerNumber,
        };
    }

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
        invoiceId: result.insertedId,
	};
};
