import {getInvoices} from "./getInvoices.js"
import getInvoiceById from "./getInvoiceById.js";
import createInvoice from "./createInvoice.js";
import calculateInvoiceTotals from "./calculateInvoiceTotals.js";
import { getInvoiceByInvoiceNumber } from "./getInvoiceByInvoiceNumber.js";



export const services = {
	getInvoices,
	getInvoiceById,
	createInvoice,
	calculateInvoiceTotals,
	getInvoiceByInvoiceNumber,
};
