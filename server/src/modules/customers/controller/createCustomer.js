const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res) => {
    const createdCustomer = await services.createCustomer({
        customer: req.body.customer,
    });

    res.json({
        customer: createdCustomer,
    });
});
