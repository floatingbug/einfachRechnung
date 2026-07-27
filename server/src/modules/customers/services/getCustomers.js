const models = require("../models");


module.exports = async ({userId}) => {
    const customers = await models.getCustomers({userId});

    return customers;
};
