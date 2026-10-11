const { catchAsync } = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
  const result = await services.deleteCustomer({
    userId: req.user.id,
    customerId: req.params.customerId,
  });

  res.json(result);
});
