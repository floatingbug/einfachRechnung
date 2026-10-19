const { catchAsync } = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
  const dashboard = await services.getDashboard({
    userId: req.user.id,
  });

  res.json(dashboard);
});
