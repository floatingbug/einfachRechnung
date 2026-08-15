import {getInvoices} from "./getInvoices.js";
import {getInvoiceById} from "./getInvoiceById.js";
import {createInvoice} from "./createInvoice.js";
import {sendInvoice, cancelInvoice, registerPayment, sendReminder, getInvoicePdf} from "./manageInvoice.js";

export const actions = {
	getInvoices,
	getInvoiceById,
	createInvoice,
	sendInvoice,
	cancelInvoice,
	registerPayment,
	sendReminder,
	getInvoicePdf,
};
