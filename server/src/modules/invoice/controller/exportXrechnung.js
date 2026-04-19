const catchAsync = require("../../../utils/catchAsync");
const { exportXrechnung } = require("../services");

module.exports = catchAsync(async (req, res) => {
	const xml = await exportXrechnung({
		invoiceId: req.params.invoiceId,
	});

	res.setHeader("Content-Type", "application/xml; charset=utf-8");
	res.setHeader(
		"Content-Disposition",
		`attachment; filename="invoice-${req.params.invoiceId}.xml"`
	);

	return res.status(200).send(xml);
});
