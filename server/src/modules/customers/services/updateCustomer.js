const models = require("../models");


module.exports = async ({customer}) => {
    const result = await models.updateCustomer({
        customer,
    });

    return customer;
};
