import {invoiceApi} from "../api";
import {mapInvoiceDtoToEntity} from "../mappers";


export default async function findById({invoiceId}){
	const result = await invoiceApi.getInvoiceById({invoiceId});

	return mapInvoiceDtoToEntity(result.invoice ?? result.data ?? result);
}
