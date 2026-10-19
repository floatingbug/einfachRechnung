const models = require("../models");


module.exports = async ({ userId }) => {
  const result = await models.getDashboard({
    userId,
  })

  return result;
};
