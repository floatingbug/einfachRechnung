const models = require("../models");


module.exports = async ({ userId, limit, page, customerId, filterString }) => {
  const getOffersResult = await models.getOffers({
    userId,
    limit: limit ? Number(limit) : null,
    page: page ? Number(page) : null,
    customerId,
    filterString,
  });

  return getOffersResult;
};
