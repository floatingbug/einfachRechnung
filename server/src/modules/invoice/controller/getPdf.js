const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const invoiceNumber = req.params.invoiceNumber;
    const userId = req.user.id;

    const pdf = await services.getPdf({
        invoiceNumber,
        userId,
    });
    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");

    pdf.pipe(res);
});
