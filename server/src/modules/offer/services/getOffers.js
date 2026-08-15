const models = require("../models");


module.exports = async ({userId, limit, page}) => {
    const getOffersResult = await models.getOffers({
        userId,
        limit,
        page,
    });

    return getOffersResult;
};
