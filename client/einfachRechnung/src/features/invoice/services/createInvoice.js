import {invoiceApi} from "../api";
import {
	mapInvoiceFormToCreatePayload,
	mapInvoiceDtoToEntity,
} from "../mappers";


export default async function createInvoice(form){
	const payload = mapInvoiceFormToCreatePayload(form);
	const result = await invoiceApi.createInvoice({invoice: payload});

	return mapInvoiceDtoToEntity(result.invoice ?? result.data ?? result);
}
