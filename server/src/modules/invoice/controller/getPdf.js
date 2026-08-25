const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const invoiceNumber = req.params.invoiceNumber;

    const pdf = await services.getPdf({
        invoiceNumber,
    });

    return pdf;
});
