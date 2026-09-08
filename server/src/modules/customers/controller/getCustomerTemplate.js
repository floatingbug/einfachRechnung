const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const customerTemplate = await services.getCustomerTemplate();

    res.json(customerTemplate);
})
