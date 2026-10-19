const model = require("../models");
const { mapToClientInvoices } = require("../mappers");


module.exports = async ({ userId, limit, page, customerId, filterString }) => {
  const result = await model.getInvoices({
    userId,
    limit,
    page,
    customerId,
    filterString,
  });

  const invoices = mapToClientInvoices(result.items);

  return {
    invoices,
    pagination: result.pagination,
  };
};
