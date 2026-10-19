const { catchAsync } = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {

  const offers = await services.getOffers({
    userId: req.user.id,
    limit: req.query.limit ?? null,
    page: req.query.page ?? null,
    customerId: req.query.customerId ?? null,
    filterString: req.query.filter ?? null,
  });

  res.json(offers);
});
