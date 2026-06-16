import {services} from "../../services";


export async function updateTax({data}){
	const updatedTax = await services.updateTax({data});

	this.tax = updatedTax;
};
