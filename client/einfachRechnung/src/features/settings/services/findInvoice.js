import settingsApi from "../api";
import {mapDtoToInvoiceEntity} from "../mappers";


export async function findInvoice(){
	const response = await settingsApi.findInvoice();

	return mapDtoToInvoiceEntity({
		dto: response.data.invoice ?? null,
	});
}
