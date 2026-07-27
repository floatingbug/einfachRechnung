import {services} from "../../services";


export async function updateEmail({emailSettings}){
	services.updateEmail({emailSettings})
	const updatedEmail = await services.updatedEmail({emailSettings});

	this.email = updatedEmail;
}
