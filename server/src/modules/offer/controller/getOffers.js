const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const limit = req.query.limit ? Number(req.query.limit) : null;
    const page = req.query.page ? Number(req.query.page) : null;
    const customerId = req.query.customerId ?? null;

    const offers = await services.getOffers({
        userId: req.user.id,
        limit,
        page,
        customerId,
    });

    res.json(offers);
});
