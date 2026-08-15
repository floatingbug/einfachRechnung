const models = require("../models");
const {calcTotals} = require("../utils");


module.exports = async ({userId, offer}) => {
    if(offer.offerDate){
        offer.offerDate = new Date(offer.offerDate);
    }
    
    if(offer.validUntil){
        offer.validUntil = new Date(offer.validUntil);
    }

    const totals = calcTotals(offer.items);
    const offerWithTotals = {
        ...offer,
        ...totals,
    };

    const result = await models.updateOffer({
        userId,
        offer: offerWithTotals,
    });

    if(result.modifiedCount === 0){
        return {
            success: false,
            message: "Es wurde nichts geändert."
        };
    }

    return {
        success: true,
        message: "Angebot wurde geändert."
    };
};
