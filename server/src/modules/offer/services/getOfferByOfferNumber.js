const models = require("../models");
const {mapToClientOffer} = require("../mappers");


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

    const clientOffer = mapToClientOffer({
        offer,
    });

    return clientOffer;
};
