const catchAsync = require("../../../utils/catchAsync");
const services = require("../services");

module.exports = catchAsync(async (req, res) => {
	const invoice = await services.cancelInvoice({
        userId: req.user.id,
		invoiceNumber: req.params.invoiceNumber,
	});

	return res.status(200).json(invoice);
});
