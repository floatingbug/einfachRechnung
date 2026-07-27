const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const updatedTax = await services.updateTax({
        userId: req.user.id,
        taxSettings: req.body,
    });

    res.json({
        ...updatedTax,
    });
});
