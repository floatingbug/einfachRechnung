const model = require("../models");
const {mapToClientInvoices} = require("../mappers");


module.exports = async ({userId, limit, page, customerId}) => {
	const result = await model.getInvoices({
        userId,
        limit,
        page,
        customerId,
    });

    const invoices = mapToClientInvoices(result.items);

    return {
        invoices,
        pagination: result.pagination,
    };
};
