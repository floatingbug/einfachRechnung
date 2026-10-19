const catchAsync = require("../../../utils/catchAsync");
const services = require("../services");

module.exports = catchAsync(async (req, res) => {

  const result = await services.getInvoices({
    userId: req.user.id,
    page: req.query.page ?? null,
    limit: req.query.limit ?? null,
    customerId: req.query.customerId ?? null,
    filterString: req.query.filter ?? null,
  });

  return res.status(200).json(result);
});
