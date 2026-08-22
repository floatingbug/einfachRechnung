const catchAsync = require("../../../utils/catchAsync");
const services = require("../services");

module.exports = catchAsync(async (req, res) => {
    const query = req.query ?? null;

    const params = {
        userId: req.user.id,
    };

    if(query){
        if(query.page) params.page = Number(query.page);
        if(query.limit) params.limit = Number(query.limit);
    }

	const result = await services.getInvoices(params);

	return res.status(200).json(result);
});
