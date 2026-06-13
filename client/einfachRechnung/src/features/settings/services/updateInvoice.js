import settingsApi from "../api";
import {mapDtoToInvoiceEntity} from "../mappers";


export async function updateInvoice({data}){
	const response = await settingsApi.updateInvoice({data});

	return mapDtoToInvoiceEntity({
		dto: response.data?.invoice ?? null,
	});
};
