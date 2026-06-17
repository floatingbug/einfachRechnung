const catchAsync = require("../../../utils/catchAsync");
const { findMany } = require("../services");

module.exports = catchAsync(async (req, res) => {
    const query = req.query ?? null;

    const params = {
        userId: req.user.id,
    };

    if(query){
        if(query.page) params.page = query.page;
        if(query.limit) params.limit = query.limit;
    }

	const result = await findMany(params);

	return res.status(200).json(result);
});
