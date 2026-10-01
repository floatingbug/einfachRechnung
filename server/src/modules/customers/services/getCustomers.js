const models = require("../models");


module.exports = async ({userId, page, limit}) => {
    const result = await models.getCustomers({
        userId,
        page,
        limit,
    });

    const customers = result.customers.map(
        customer => {
            const {_id: id, ...customerData} = customer;

            return {
                id,
                ...customerData,
            }
        }
    );

    return {
        customers,
        pagination: result.pagination,
    };
};
