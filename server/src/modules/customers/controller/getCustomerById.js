const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const customer = await services.getCustomerById({
        userId: req.user.id,
        customerId: req.params.customerId,
    });

    res.json(customer);
});
