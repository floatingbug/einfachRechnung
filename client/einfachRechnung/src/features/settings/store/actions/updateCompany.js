import {updateCompany as updateCompanyService} from "../../services";


export async function updateCompany({data} = {}){
	const updatedCompany = await updateCompanyService({data});

	this.company = updatedCompany;
}
