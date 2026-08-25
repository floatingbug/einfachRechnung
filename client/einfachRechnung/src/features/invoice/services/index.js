import {getInvoices} from "./getInvoices.js"
import getInvoiceById from "./getInvoiceById.js";
import createInvoice from "./createInvoice.js";
import calculateInvoiceTotals from "./calculateInvoiceTotals.js";
import { getInvoiceByInvoiceNumber } from "./getInvoiceByInvoiceNumber.js";
import { updateInvoice } from "./updateInvoice.js";
import {getPdf} from "./getPdf";


export const services = {
	getInvoices,
	getInvoiceById,
	createInvoice,
	calculateInvoiceTotals,
	getInvoiceByInvoiceNumber,
	updateInvoice,
	getPdf,
};
