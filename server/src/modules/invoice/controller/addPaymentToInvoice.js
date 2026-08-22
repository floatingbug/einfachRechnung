const catchAsync = require("../../../utils/catchAsync");
const services = require("../services");

module.exports = catchAsync(async (req, res) => {
	const invoice = await services.addPaymentToInvoice({
		invoiceId: req.params.invoiceId,
		amount: req.body.amount,
		paidAt: req.body.paidAt,
		method: req.body.method,
		reference: req.body.reference,
	});

	return res.status(200).json(invoice);
});
