const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const updatedCompany = await services.updateCompany({
        userId: req.user.id,
        company: req.company,
    });

    res.json({
        ...updatedCompany,
    });
});
