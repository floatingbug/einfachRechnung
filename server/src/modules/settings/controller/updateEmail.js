const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const updatedEmail = await services.updateEmail({
        userId: req.user.id,
        emailSettings: req.body,
    });

    res.json({
        ...updatedEmail,
    });
});
