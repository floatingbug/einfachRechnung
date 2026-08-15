import {getInvoices} from "./getInvoices.js"
import getInvoiceById from "./getInvoiceById.js";
import createInvoice from "./createInvoice.js";
import calculateInvoiceTotals from "./calculateInvoiceTotals.js";
import {sendInvoice, cancelInvoice, registerPayment, sendReminder, getInvoicePdf} from "./manageInvoice.js";


export const services = {
	getInvoices,
	getInvoiceById,
	createInvoice,
	calculateInvoiceTotals,
	sendInvoice,
	cancelInvoice,
	registerPayment,
	sendReminder,
	getInvoicePdf,
};
