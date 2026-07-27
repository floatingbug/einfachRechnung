const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const updatedInvoice = await services.updateInvoice({
        invoiceSettings: req.body,
        userId: req.user.id,
    });

    res.json({
        ...updatedInvoice,
    });
});
