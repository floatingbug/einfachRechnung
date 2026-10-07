import {getInvoices} from "./getInvoices.js";
import {getInvoiceById} from "./getInvoiceById.js";
import {createInvoice} from "./createInvoice.js";
import {getInvoiceByInvoiceNumber} from "./getInvoiceByInvoiceNumber.js";
import { updateInvoice } from "./updateInvoice.js";
import {getPdf} from "./getPdf.js";
import {cancelInvoice} from "./cancelInvoice.js";
import {deleteInvoice} from "./deleteInvoice.js";
import {sendInvoiceByEmail} from "./sendInvoiceByEmail.js";


export const actions = {
	getInvoices,
	getInvoiceById,
	createInvoice,
	cancelInvoice,
	getInvoiceByInvoiceNumber,
	updateInvoice,
	getPdf,
	deleteInvoice,
	sendInvoiceByEmail,
};
