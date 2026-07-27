import {services} from "../../services";


export async function updateTax({taxSettings}){
	const updatedTax = await services.updateTax({taxSettings});

	this.tax = updatedTax;
};
