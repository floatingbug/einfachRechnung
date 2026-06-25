import {services} from "../../services";


export async function updateCompany({company} = {}){
	const updatedCompany = await services.updateCompany({company});

	this.company = updatedCompany;
}
