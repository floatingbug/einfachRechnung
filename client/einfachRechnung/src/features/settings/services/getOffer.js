import {settingsApi} from "../api";
import {mapDtoToOfferEntity} from "../mappers";


export async function getOffer(){
	const fetchedOfferSettings = await settingsApi.getOffer();

	return mapDtoToOfferEntity({
		dto: fetchedOfferSettings
	});
}
