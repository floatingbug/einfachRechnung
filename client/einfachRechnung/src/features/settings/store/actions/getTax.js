import {services} from "../../services";


export async function getTax(){
	const tax = await services.getTax();

	this.tax = tax;
};
