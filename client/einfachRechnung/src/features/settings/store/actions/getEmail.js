import {services} from "../../services";


export async function getEmail(){
	const emailSettings = await services.getEmail();

	this.email = emailSettings;
}
