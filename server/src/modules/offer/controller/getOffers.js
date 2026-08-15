const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const limit = Number(req.query.limit);
    const page = Number(req.query.page)

    const offers = await services.getOffers({
        userId: req.user.id,
        limit,
        page,
    });

    res.json(offers);
});
