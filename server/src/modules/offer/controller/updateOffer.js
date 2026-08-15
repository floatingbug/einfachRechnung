const services = require("../services");
const {catchAsync} = require("../../../utils");


module.exports = catchAsync(async (req, res, next) => {
    const result = await services.updateOffer({
        userId: req.user.id,
        offer: req.body,
    });

    res.json(result);
})
