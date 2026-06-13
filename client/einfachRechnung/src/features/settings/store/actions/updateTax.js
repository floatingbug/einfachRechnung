import {updateTax as updateTaxService} from "../../services";


export async function updateTax({data}){
	const updatedTax = await updateTaxService({data});

	this.tax = updatedTax;
};
