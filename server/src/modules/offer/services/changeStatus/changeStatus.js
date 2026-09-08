const models = require("../../models");
const {validateStatusChange} = require("./modules");


module.exports = async ({userId, offerNumber, status}) => {
    const offer = await models.getOfferByOfferNumber({
        userId,
        offerNumber,
    });

    if(!offer){
        const error = new Error("Das Angebot konnte nicht gefunden werden.");
        error.status = 404;

        throw error;
    }

    const validStatusChange = validateStatusChange({
        currentStatus: offer.status,
        newStatus: status,
    });

    if(!validStatusChange){
        const error = new Error(
            `Statusübergang von ${offer.status} zu ${status} ist nicht erlaubt.`,
        );
        error.status = 400;

        throw error;
    }

    const result = await models.updateOffer({
        userId,
        offerNumber,
        update: {
            status,
        },
    });

    if(result.matchedCount === 0){
        const error = new Error("Angebot nicht gefunden.");
        error.status = 404;

        throw error;
    }

    return {
        success: true,
        message: "Status wurde geändert.",
    };
};
