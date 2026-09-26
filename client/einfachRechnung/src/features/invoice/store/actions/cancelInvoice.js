import {services} from "../../services";


export async function cancelInvoice({invoiceNumber}){
	await services.cancelInvoice({
		invoiceNumber,
	})
}
