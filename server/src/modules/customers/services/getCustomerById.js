const models = require("../models");


module.exports = async ({customerId}) => {
    const customer = await models.getCustomerById({
        customerId,
    });

    return customer;
}
