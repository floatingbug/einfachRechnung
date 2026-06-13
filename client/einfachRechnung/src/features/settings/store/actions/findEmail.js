import {findEmail as findEmailService} from "../../services";


export async function findEmail(){
	const emailSettings = await findEmailService();

	this.email = emailSettings;
}
