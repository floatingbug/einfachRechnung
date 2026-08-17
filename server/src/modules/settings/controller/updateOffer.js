const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const updatedOfferSettings = await services.updateOffer({
        userId: req.user.id,
        offerSettings: req.body,
    });

    res.json(updatedOfferSettings);
});
