import {findCompany as findCompanyService} from "../../services";


export async function findCompany(){
	const fetchedCompany = await findCompanyService();

	this.company = fetchedCompany;
}
