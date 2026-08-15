import {services} from "../../services";

export async function getInvoiceById({invoiceId}){
	return services.getInvoiceById({invoiceId});
}
