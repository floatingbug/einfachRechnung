const createInvoice = require("./createInvoice");
const getInvoiceById = require("./getInvoiceById");
const getInvoices = require("./getInvoices");
const addPaymentToInvoice = require("./addPaymentToInvoice");
const sendInvoice = require("./sendInvoice");
const cancelInvoice = require("./cancelInvoice");
const exportXInvoice = require("./exportXInvoice");
const getInvoiceByInvoiceNumber = require("./getInvoiceByInvoiceNumber");
const updateInvoice = require("./updateInvoice");
const getPdf = require("./getPdf");


module.exports = {
	createInvoice,
	getInvoiceById,
	getInvoices,
	addPaymentToInvoice,
	sendInvoice,
	cancelInvoice,
	exportXInvoice,
    getInvoiceByInvoiceNumber,
    updateInvoice,
    getPdf,
};
