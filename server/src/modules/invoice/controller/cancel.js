const catchAsync = require("../../../utils/catchAsync");
const { cancel } = require("../services");

module.exports = catchAsync(async (req, res) => {
	const invoice = await cancel({
		invoiceId: req.params.invoiceId,
	});

	return res.status(200).json(invoice);
});
