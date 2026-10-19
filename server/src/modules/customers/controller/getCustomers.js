const { catchAsync } = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
  const result = await services.getCustomers({
    userId: req.user.id,
    queries: req.query,
  });


  res.json({
    ...result,
  });
});
