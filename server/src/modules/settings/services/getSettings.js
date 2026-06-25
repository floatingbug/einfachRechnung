const models = require("../models");


module.exports = async ({type, userId}) => {
    const settings = await models.getSettings({type, userId});

    console.log(settings);

    return settings;
};
