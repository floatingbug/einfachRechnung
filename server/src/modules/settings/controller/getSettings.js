const { catchAsync } = require("../../../utils");
const services = require("../services");

module.exports = catchAsync(async (req, res) => {
    const type = req.params?.type ?? "company";

    const allowedTypes = [
        "company",
        "email",
        "invoice",
        "tax",
    ];

    if (!allowedTypes.includes(type)) {
        return res.status(400).json({
            message: "Invalid settings type.",
        });
    }

    const settings = await services.getSettings({
        type,
        userId: req.user.id,
    });

    res.json({
        ...settings,
    });
});
