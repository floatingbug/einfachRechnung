const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const result = await services.saveOffer({
        userId: req.user.id,
        offer: req.body,
    });

    res.json(res.body);
});
