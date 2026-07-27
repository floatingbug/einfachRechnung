const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const offerTemplate = await services.getOfferTemplate({
        userId: req.user.id,
    });

    res.json(offerTemplate);
});
