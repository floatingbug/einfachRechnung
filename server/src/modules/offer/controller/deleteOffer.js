const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res) => {
    const {offerNumber} = req.params;

    const result = await services.deleteOffer({
        userId: req.user.id,
        offerNumber,
    });

    res.json(result);
});
