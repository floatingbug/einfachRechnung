const models = require("../models");


module.exports = async ({userId, limit, page, customerId}) => {
    const getOffersResult = await models.getOffers({
        userId,
        limit,
        page,
        customerId,
    });

    return getOffersResult;
};
