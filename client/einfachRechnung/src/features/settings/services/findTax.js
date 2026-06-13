import settingsApi from "../api";
import {mapDtoToTaxEntity} from "../mappers";


export async function findTax(){
	const response = await settingsApi.findTax();

	return mapDtoToTaxEntity({
		dto: response.data.tax ?? null,
	});
};
