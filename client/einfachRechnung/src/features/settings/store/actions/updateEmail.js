import {services} from "../../services";


export async function updateEmail({emailSettings}){
	const updatedEmail = await services.updateEmail({emailSettings});

	this.email = updatedEmail;
}
