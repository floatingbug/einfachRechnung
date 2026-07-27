const models = require("../models");


module.exports = async ({invoiceSettings, userId}) => {
    const result = await models.updateInvoice({
        invoiceSettings,
        userId,
    });

    return invoiceSettings;
};
