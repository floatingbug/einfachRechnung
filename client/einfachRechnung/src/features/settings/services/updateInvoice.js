import {settingsApi} from "../api";
import {mapDtoToInvoiceEntity} from "../mappers";


export async function updateInvoice({invoiceSettings}){
	const updatedInvoice = await settingsApi.updateInvoice({invoiceSettings});

	return mapDtoToInvoiceEntity({
		dto: updatedInvoice,
	});
};
