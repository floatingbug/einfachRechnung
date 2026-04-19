import invoiceApi from "../api";
import {
	mapInvoiceFormToCreatePayload,
	mapInvoiceDtoToEntity,
} from "../mappers";


export default async function create(form){
	const payload = mapInvoiceFormToCreatePayload(form);
	const result = await invoiceApi.create(payload);

	return mapInvoiceDtoToEntity(result.data)
}
