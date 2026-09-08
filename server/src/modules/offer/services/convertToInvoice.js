const offerModels = require("../models");
const invoiceServices = require("../../invoice/services");
const settingsServices = require("../../settings/services");


module.exports = async ({userId, offerNumber}) => {
	const offer = await offerModels.getOfferByOfferNumber({
		userId,
		offerNumber,
	});

	if (!offer) {
		throw new Error("Angebot wurde nicht gefunden.");
	}

    if (offer.invoiceId) {
        const error = new Error("Das Angebot wurde bereits in eine Rechnung umgewandelt.");
        error.status = 409;

        throw error;
    }

	const invoiceSettings = await settingsServices.getSettings({
		userId,
		type: "invoice",
	});

	const dueDays = invoiceSettings.dueDays ?? 7;

	const invoiceDate = new Date();
	const serviceDate = new Date(invoiceDate);
	const dueDate = new Date(invoiceDate);

	dueDate.setDate(dueDate.getDate() + dueDays);

	const invoice = {
		offerId: offer._id,
		offerNumber: offer.offerNumber,

		items: offer.items,

		taxTreatment: offer.taxTreatment ?? "standard",
		currency: offer.currency ?? "EUR",

		invoiceDate,
		dueDate,
		serviceDate,

		paymentMethod: invoiceSettings.paymentMethod ?? "bankTransfer",
		note: "",
	};

	const createInvoiceResult = await invoiceServices.createInvoice({
		invoice,
		customerId: offer.customerId,
		customerSnapshot: offer.customerSnapshot,
		userId,
	});

    if(!createInvoiceResult.invoiceId){
        throw new Error("Angebot konnte nicht konvertiert werden.")
    }

    await offerModels.updateOffer({
        offerNumber,
        userId,
        update: {
            invoiceId: createInvoiceResult.invoiceId,
        }
    });

    return createInvoiceResult;
};
