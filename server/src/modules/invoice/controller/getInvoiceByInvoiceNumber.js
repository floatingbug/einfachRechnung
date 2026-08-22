const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const invoice = await services.getInvoiceByInvoiceNumber({
        userId: req.user.id,
        invoiceNumber: req.params.invoiceNumber,
    });


    res.json(invoice);
});
