const models = require("../models");


module.exports = async ({customer, userId}) => {
    const result = await models.createCustomer({
        userId,
        customer,
    });

    if(!result.insertedId){
        const error = new Error("Kunde konnte nicht angelegt werden.");

        throw error;
    }

    return result.insertedId;
};
