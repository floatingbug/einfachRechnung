const models = require("../models")

module.exports = async ({userId}) => {

    const result = await models.createDefaultSettings({userId});

    return result;
};
