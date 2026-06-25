import {settingsApi} from "../api";
import {createCompanyEntity} from "../entities";


export async function updateCompany({company}){
	const companyDto = await settingsApi.updateCompany({company});

	return createCompanyEntity({
		company: companyDto,
	});
}
