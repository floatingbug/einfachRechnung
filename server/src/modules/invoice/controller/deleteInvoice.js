const { catchAsync } = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
  await services.deleteInvoice({
    userId: req.user.id,
    invoiceNumber: req.params.invoiceNumber,
  })

  res.status(204).end();
});
