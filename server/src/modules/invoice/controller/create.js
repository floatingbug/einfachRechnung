const catchAsync = require("../../../utils/catchAsync");
const { create } = require('../services');


module.exports = catchAsync(async (req, res) => {
		const invoice = await create({
			seller: req.body.seller,
			customer: req.body.customer,
			invoiceDate: req.body.invoiceDate,
			dueDate: req.body.dueDate,
			currency: req.body.currency,
			items: req.body.items,
			note: req.body.note,
		});

		return res.status(201).json(invoice);
});
