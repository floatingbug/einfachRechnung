const createInvoice = require("./createInvoice");
const getInvoiceById = require("./getInvoiceById");
const getInvoices = require("./getInvoices");
const addPaymentToInvoice = require("./addPaymentToInvoice");
const updateInvoiceStatus = require("./updateInvoiceStatus");
const getInvoiceByInvoiceNumber = require("./getInvoiceByInvoiceNumber");

module.exports = {
	createInvoice,
    getInvoiceById,
    getInvoices,
	addPaymentToInvoice,
	updateInvoiceStatus,
    getInvoiceByInvoiceNumber,
};
