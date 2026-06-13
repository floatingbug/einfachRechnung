import {findTax as findTaxService} from "../../services";


export async function findTax(){
	const fetchedTax = await findTaxService();

	this.tax = fetchedTax;
};
