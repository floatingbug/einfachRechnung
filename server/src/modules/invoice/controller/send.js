const catchAsync = require("../../../utils/catchAsync");
const { send } = require("../services");

module.exports = catchAsync(async (req, res) => {
	const invoice = await send({
		invoiceId: req.params.invoiceId,
	});

	return res.status(200).json(invoice);
});
