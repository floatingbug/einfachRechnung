import {settingsApi} from "../api";
import {mapDtoToEmailEntity} from "../mappers";


export async function getEmail(){
	const emailDto = await settingsApi.getEmail();

	return mapDtoToEmailEntity({
		dto: emailDto,
	});
}
