const {getPossibleActions, getPossibleStatus} = require("../domainRules");


module.exports = ({offer}) => {
    const clientOffer = {
        ...offer,
        possibleActions: getPossibleActions({
            status: offer.status,
        }),
        possibleStatus: getPossibleStatus({
            status: offer.status,
        }),
    };


    return clientOffer;
};
