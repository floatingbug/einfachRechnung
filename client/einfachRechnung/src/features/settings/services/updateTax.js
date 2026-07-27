import {settingsApi} from "../api";
import {mapDtoToTaxEntity} from "../mappers";


export async function updateTax({taxSettings}){
	const updatedTax = await settingsApi.updateTax({taxSettings});

	return mapDtoToTaxEntity({
		dto: updatedTax,
	});
};
