const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const offerNumber = req.params.offerNumber;

    const result = await services.changeStatus({
        userId,
        offerNumber,
        status: req.body.newStatus,
    });

    res.json({
        offerNumber,
    })
});

