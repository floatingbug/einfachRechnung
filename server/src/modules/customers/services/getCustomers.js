const models = require("../models");


module.exports = async () => {
    const customers = await models.getCustomers();

    return customers;
};
