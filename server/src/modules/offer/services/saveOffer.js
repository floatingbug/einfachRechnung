const settingsModels = require("../../settings/models");
const offerModels = require("../models");
const customerModels = require("../../customers/models");
const {ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, offer}) => {
    //increase nextOfferNumber in settings.offer
    const nextOfferNumber = await settingsModels.incNextOfferNumber({
        userId,
    });

    //get offerSettings
    const offerSettings = await settingsModels.getSettings({
        userId,
        type: "offer",
    });

    //create offerNumber
    const offerNumber = formatOfferNumber({
        format: offerSettings.offerNumberFormat,
        prefix: offerSettings.offerPrefix,
        number: nextOfferNumber,
    });

    //create customer and company snapshot
    const customerSnapshot = await customerModels.getCustomerById({
        customerId: offer.customerId,
    });

    const companySnapshot = await settingsModels.getSettings({
        userId,
        type: "company",
    });

    //calculate sum
    
    //create dates
    const createdAt = new Date();
    const updatedAt = new Date(createdAt);

    //create offerToSave
    const offerToSave = {
        userId: new ObjectId(userId),
        customerId: new ObjectId(offer.customerId),
        offerNumber,
        offerDate: offer.offerDate,
        validUntil: offer.validUntil,
        project: offer.project,
        introduction: offer.introduction,
        closing: offer.closing,
        showTaxRatePerItem: offer.showTaxRatePerItem,
        showItemNumbers: offer.showItemNumbers,
        items: offer.items,
        status: "draft",
        createdAt,
        updatedAt,
        customerSnapshot,
        companySnapshot,
    };

    //save offer
    const result = await offerModels.saveOffer({
        offer: offerToSave,
    });


    // --- helpers ---
    function formatOfferNumber({
        format,
        prefix = "",
        number,
        date = new Date(),
        numberLength = 5,
    }) {
        if (number == null) {
            throw new Error("number is required");
        }

        const year = date.getFullYear();
        const paddedNumber = String(number).padStart(numberLength, "0");

        return format
            .replaceAll("{prefix}", prefix)
            .replaceAll("{year}", String(year))
            .replaceAll("{number}", paddedNumber);
    }

    return result;
};
