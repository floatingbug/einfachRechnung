const models = require("../models");


module.exports = async ({userId, company}) => {
    const result = await models.updateCompany({
        userId,
        company
    });

    return company;
};
