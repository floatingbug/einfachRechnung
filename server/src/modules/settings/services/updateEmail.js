const models = require("../models");


module.exports = async ({userId, emailSettings}) => {
    const result = await models.updateEmail({
        userId,
        emailSettings,
    });


    return emailSettings;
};
