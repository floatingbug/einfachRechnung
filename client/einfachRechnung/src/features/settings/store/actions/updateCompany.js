import {services} from "../../services";


export async function updateCompany({data} = {}){
	const updatedCompany = await services.updateCompany({data});

	this.company = updatedCompany;
}
