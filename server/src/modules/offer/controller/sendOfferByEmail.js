const { catchAsync } = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
  const result = await services.sendOfferByEmail({
    userId: req.user.id,
    offerNumber: req.params.offerNumber,
  });

  res.status(200).json(result);
});
