const {catchAsync} = require("../../../utils");
const services = require("../services");


module.exports = catchAsync(async (req, res, next) => {
    const offerNumber = req.params.offerNumber;
    const userId = req.user.id;

    const result = await services.convertToInvoice({
        offerNumber,
        userId,
    })

    res.json(result);
});
