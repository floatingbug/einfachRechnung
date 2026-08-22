import {getInvoices} from "./getInvoices.js";
import {getInvoiceById} from "./getInvoiceById.js";
import {createInvoice} from "./createInvoice.js";
import {getInvoiceByInvoiceNumber} from "./getInvoiceByInvoiceNumber.js";

export const actions = {
	getInvoices,
	getInvoiceById,
	createInvoice,
	getInvoiceByInvoiceNumber,
};
