const { catchAsync } = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
  const result = await services.name({

  });

  res.json(result);
});
