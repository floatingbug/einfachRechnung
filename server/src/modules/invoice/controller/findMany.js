const catchAsync = require("../../../utils/catchAsync");
const { findMany } = require("../services");

module.exports = catchAsync(async (req, res) => {
	const invoices = await findMany({
		status: req.validatedQuery.status,
		customerName: req.validatedQuery.customerName,
		page: req.validatedQuery.page,
		limit: req.validatedQuery.limit,
	});

	return res.status(200).json(invoices);
});
