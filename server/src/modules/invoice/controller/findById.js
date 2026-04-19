const catchAsync = require("../../../utils/catchAsync");
const { findById } = require("../services");

module.exports = catchAsync(async (req, res) => {
	const invoice = await findById({
		invoiceId: req.params.invoiceId,
	});

	if (!invoice) {
		return res.status(404).json({
			error: "Invoice not found",
		});
	}

	return res.status(200).json(invoice);
});
