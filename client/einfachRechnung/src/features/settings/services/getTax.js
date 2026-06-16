import {settingsApi} from "../api";
import {mapDtoToTaxEntity} from "../mappers";


export async function getTax(){
	const taxDto = await settingsApi.getTax();

	return mapDtoToTaxEntity({
		dto: taxDto,
	});
};
