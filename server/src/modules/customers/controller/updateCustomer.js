const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res) => {
    const updatedCustomer = await services.updateCustomer({
        customer: req.body.customer,
    });

    res.json({
        customer: updatedCustomer,
    });
});
