import {updateEmail as updateEmailService} from "../../services";


export async function updateEmail({data}){
	const updatedEmail = await updateEmailService({data});

	this.email = updatedEmail;
}
