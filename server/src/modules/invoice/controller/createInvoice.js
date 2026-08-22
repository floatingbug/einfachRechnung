const catchAsync = require("../../../utils/catchAsync");
const services = require('../services');


module.exports = catchAsync(async (req, res) => {
		const result = await services.createInvoice({
            invoice: req.body.invoice,
            customerId: req.body.customerId,
            userId: req.user.id,
		});

		return res.status(201).json(result);
});
