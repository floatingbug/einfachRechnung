const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res) => {
    const customerId = await services.createCustomer({
        userId: req.user.id,
        customer: req.body,
    });

    res.json({
        customerId,
    });
});
