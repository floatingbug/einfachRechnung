const catchAsync = require("../../../utils/catchAsync");
const services = require("../services");

module.exports = catchAsync(async (req, res) => {
  const result = await services.sendInvoiceByEmail({
    userId: req.user.id,
    invoiceNumber: req.params.invoiceNumber,
  });

  res.status(200).json(result);
});
