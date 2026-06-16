import {settingsApi} from "../api";
import {mapDtoToInvoiceEntity} from "../mappers";


export async function getInvoice(){
	const invoiceDto = await settingsApi.getInvoice();

	return mapDtoToInvoiceEntity({
		dto: invoiceDto,
	});
}
