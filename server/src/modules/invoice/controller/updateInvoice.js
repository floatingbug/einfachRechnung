const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const invoiceNumber = req.params.invoiceNumber;
    const invoiceDraft = req.body;
    const userId = req.user.id;

    const invoice = await services.updateInvoice({
        userId,
        invoiceNumber,
        invoiceDraft,
    })

    res.json(invoice);
});
