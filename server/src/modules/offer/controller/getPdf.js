const { catchAsync } = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res) => {
    const {offerNumber} = req.params;

    const pdf = await services.getPdf({
        userId: req.user.id,
        offerNumber,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");

    pdf.pipe(res);
});
