const models = require("../models");


module.exports = async ({customer}) => {
    const result = await models.createCustomer({
        customer,
    });

    return customer;
};
