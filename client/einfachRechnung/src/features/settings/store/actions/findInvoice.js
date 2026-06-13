import {findInvoice as findInvoiceService} from "../../services";


export async function findInvoice(){
	const fetchedInvoice = await findInvoiceService();

	this.invoice = fetchedInvoice;
};
