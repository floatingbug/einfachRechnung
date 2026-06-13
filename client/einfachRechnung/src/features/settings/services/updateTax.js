import settingsApi from "../api";
import {mapDtoToTaxEntity} from "../mappers";


export async function updateTax({data}){
	const response = await settingsApi.updateTax({data});

	return mapDtoToTaxEntity({
		dto: response.data?.tax ?? null,
	});
};
