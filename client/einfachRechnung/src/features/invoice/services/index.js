import {getInvoices} from "./getInvoices.js"
import getInvoiceById from "./getInvoiceById.js";
import createInvoice from "./createInvoice.js";
import calculateInvoiceTotals from "./calculateInvoiceTotals.js";
import { getInvoiceByInvoiceNumber } from "./getInvoiceByInvoiceNumber.js";
import { updateInvoice } from "./updateInvoice.js";
import {getPdf} from "./getPdf";
import { cancelInvoice } from "./cancelInvoice.js";
import { deleteInvoice } from "./deleteInvoice.js";


export const services = {
	getInvoices,
	getInvoiceById,
	createInvoice,
	calculateInvoiceTotals,
	cancelInvoice,
	getInvoiceByInvoiceNumber,
	updateInvoice,
	getPdf,
	deleteInvoice,
};
