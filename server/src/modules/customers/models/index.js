const getCustomers = require("./getCustomers");
const createCustomer = require("./createCustomer");
const updateCustomer = require("./updateCustomer");
const getCustomerById = require("./getCustomerById");
const countCustomers = require("./countCustomers");
const deleteCustomer = require("./deleteCustomer");
const getCustomersDocuments = require("./getCustomersDocuments");
const deleteDocument = require("./deleteDocument");
const getInvoicesCursor = require("./getInvoicesCursor");
const getOffersCursor = require("./getOffersCursor");


module.exports = {
  getCustomers,
  createCustomer,
  updateCustomer,
  getCustomerById,
  countCustomers,
  deleteCustomer,
  getCustomersDocuments,
  deleteDocument,
  getInvoicesCursor,
  getOffersCursor,
};
