const models = require("../models");


module.exports = async ({userId, offerSettings}) => {
    models.updateOffer({
        userId,
        offerSettings,
    })

    return offerSettings;
}
