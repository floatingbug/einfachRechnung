const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const result = await services.getCustomers({
        userId: req.user.id,
        page: req.query.page ? Number(req.query.page) : 0,
        limit: req.query.limit ? Number(req.query.limit) : 100_000,
    });


    res.json({
        ...result,
    });
});
