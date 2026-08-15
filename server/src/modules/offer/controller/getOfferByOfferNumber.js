const { catchAsync } = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res) => {
	const { offerNumber } = req.params;

	const offer = await services.getOfferByOfferNumber({
		userId: req.user.id,
		offerNumber,
	});

	res.json(offer);
});
