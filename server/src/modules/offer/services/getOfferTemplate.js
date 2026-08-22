const models = require("../../settings/models");


module.exports = async ({userId}) => {
    const offerSettings = await models.getSettings({
        userId,
        type: "offer",
    });

    const offerTemplate = {
        validityDays: offerSettings.validityDays,
        offerPrefix: offerSettings.offerPrefix,
        offerNumberFormat: offerSettings.offerNumberFormat,
        introduction: offerSettings.introduction,
        closing: offerSettings.closing,
        showTaxRatePerItem: offerSettings.showTaxRatePerItem,
        showItemNumbers: offerSettings.showItemNumbers,
    };

    return offerTemplate;
};
