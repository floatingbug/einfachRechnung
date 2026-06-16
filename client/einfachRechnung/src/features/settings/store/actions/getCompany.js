import {services} from "../../services";


export async function getCompany(){
	const company = await services.getCompany();

	this.company = company;
}
