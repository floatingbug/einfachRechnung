import settingsApi from "../api";
import {mapDtoToEmailEntity} from "../mappers";


export async function findEmail(){
	const response = await settingsApi.findEmail();

	return mapDtoToEmailEntity({
		dto: response.data.email,
	});
}
