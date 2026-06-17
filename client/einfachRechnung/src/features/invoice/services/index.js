import {getInvoices} from "./getInvoices.js"
import getInvoiceById from "./getInvoiceById.js";
import createInvoice from "./createInvoice.js";
import calculateInvoiceTotals from "./calculateInvoiceTotals.js";


export const services = {
	getInvoices,
	getInvoiceById,
	createInvoice,
	calculateInvoiceTotals,
};
