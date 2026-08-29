const createInvoice = require("./createInvoice");
const getInvoiceById = require("./getInvoiceById");
const getInvoices = require("./getInvoices");
const addPaymentToInvoice = require("./addPaymentToInvoice");
const updateInvoiceStatus = require("./updateInvoiceStatus");
const getInvoiceByInvoiceNumber = require("./getInvoiceByInvoiceNumber");
const updateInvoice = require("./updateInvoice");
const getDocumentByInvoiceNumber = require("./getDocumentByInvoiceNumber");
const updateDocument = require("./updateDocument");
const createDocument = require("./createDocument");


module.exports = {
	createInvoice,
    getInvoiceById,
    getInvoices,
	addPaymentToInvoice,
	updateInvoiceStatus,
    getInvoiceByInvoiceNumber,
    updateInvoice,
    
    getDocumentByInvoiceNumber,
    updateDocument,
    createDocument,
};
