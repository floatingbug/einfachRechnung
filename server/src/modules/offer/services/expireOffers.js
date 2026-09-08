const models = require("../models");


module.exports = async () => {
    const result = await models.expireOffers();
}
