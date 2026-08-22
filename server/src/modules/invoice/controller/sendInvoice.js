const catchAsync = require("../../../utils/catchAsync");
const services = require("../services");

module.exports = catchAsync(async (req, res) => {
	const invoice = await services.sendInvoice({
		invoiceId: req.params.invoiceId,
	});

	return res.status(200).json(invoice);
});
