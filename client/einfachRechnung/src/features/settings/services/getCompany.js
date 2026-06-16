import {mapDtoToCompanyEntity} from "../mappers";
import {settingsApi} from "../api";


export async function getCompany(){
	const companyDto = await settingsApi.getCompany();

	return mapDtoToCompanyEntity({dto: companyDto});
}
