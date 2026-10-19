const models = require("../models");


module.exports = async ({ userId, queries }) => {

  const result = await models.getCustomers({
    userId,
    queries,
  });

  const customers = result.customers.map(
    customer => {
      const { _id: id, ...customerData } = customer;

      return {
        id,
        ...customerData,
      }
    }
  );

  return {
    customers,
    pagination: result.pagination,
  };
};
