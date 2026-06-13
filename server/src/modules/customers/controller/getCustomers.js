const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const customers = await services.getCustomers();


    res.json({
        customers,
    });
});
