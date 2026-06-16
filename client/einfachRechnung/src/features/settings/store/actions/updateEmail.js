import {services} from "../../services";


export async function updateEmail({data}){
	const updatedEmail = await services.updatedEmail({data});

	this.email = updatedEmail;
}
