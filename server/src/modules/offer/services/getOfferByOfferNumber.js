const models = require("../models");


module.exports = async ({userId, offerNumber}) => {
    const offer = await models.getOfferByOfferNumber({
        userId,
        offerNumber,
    });

    if(!offer){
        const error = new Error("Offer not found.");
        error.status = 404;

        throw error;
    }

    return offer;
};
