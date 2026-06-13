import {mapDtoToCompanyEntity} from "../mappers";
import settingsApi from "../api";


export async function findCompany(){
	const response = await settingsApi.findCompany();

	return mapDtoToCompanyEntity({dto: response.data.company});
}
