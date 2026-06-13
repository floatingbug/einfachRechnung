import settingsApi from "../api";
import {mapDtoToEmailEntity} from "../mappers";


export async function updateEmail({data}){
	const response = await settingsApi.updateEmail({data});

	return mapDtoToEmailEntity({
		dto: response.data.email ?? null,
	});
}
