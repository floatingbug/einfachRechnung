import {settingsApi} from "../api";
import {mapDtoToEmailEntity} from "../mappers";


export async function updateEmail({emailSettings} = {}){
	const updatedEmail = await settingsApi.updateEmail({emailSettings});

	return mapDtoToEmailEntity({
		dto: updatedEmail,
	});
}
