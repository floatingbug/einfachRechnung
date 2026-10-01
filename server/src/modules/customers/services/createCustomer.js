const models = require("../models");
const authModels = require("../../auth/models");
const {subscriptionConfig} = require("../../../config");


module.exports = async ({customer, userId}) => {
    // get user for subscription plan
    const user = await authModels.getUserById({userId});

    if(!user){
        const error = new Error("Benutzer nicht gefunden.");
        
        error.status = 404;

        throw error;
    }
    
    const plan = subscriptionConfig.plans[user.subscription.plan];

    // check limit
    const customerCount = await models.countCustomers({userId});

    if (customerCount >= plan.customerLimit) {
        const error = new Error(
            `Das Limit von ${plan.customerLimit} Kunden wurde erreicht.`
        );

        error.status = 403;

        throw error;
    }

    // create customer
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
