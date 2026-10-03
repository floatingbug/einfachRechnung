const createInvoice = require("./createInvoice");
const getInvoiceById = require("./getInvoiceById");
const getInvoices = require("./getInvoices");
const addPaymentToInvoice = require("./addPaymentToInvoice");
const updateInvoiceStatus = require("./updateInvoiceStatus");
const updateInvoice = require("./updateInvoice");
const getInvoiceByInvoiceNumber = require("./getInvoiceByInvoiceNumber");
const getDocumentByInvoiceId = require("./getDocumentByInvoiceId");
const updateDocument = require("./updateDocument");
const createDocument = require("./createDocument");
const deleteDocument = require("./deleteDocument");
const deleteInvoice = require("./deleteInvoice");


module.exports = {
  createInvoice,
  getInvoiceById,
  getInvoices,
  addPaymentToInvoice,
  updateInvoiceStatus,
  getInvoiceByInvoiceNumber,
  deleteDocument,
  updateInvoice,
  deleteInvoice,

  getDocumentByInvoiceId,
  updateDocument,
  createDocument,
};
