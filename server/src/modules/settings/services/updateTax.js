const models = require("../models");


module.exports = async ({userId, taxSettings}) => {
    const result = await models.updateTax({
        userId,
        taxSettings,
    });

    return taxSettings;
};
