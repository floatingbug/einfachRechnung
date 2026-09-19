const catchAsync = require("../../../utils/catchAsync");
const services = require("../services");

module.exports = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const page = req.query.page ? Number(req.query.page) : null;
    const limit = req.query.limit ? Number(req.query.limit) : null;
    const customerId = req.query.customerId ?? null;

	const result = await services.getInvoices({
        userId,
        page,
        limit,
        customerId,
    });

	return res.status(200).json(result);
});
