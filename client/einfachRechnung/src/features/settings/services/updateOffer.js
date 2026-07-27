import {settingsApi} from "../api";
import {mapDtoToOfferEntity} from "../mappers";


export async function updateOffer({offerSettings}){
	const offerSettingsDto = await settingsApi.updateOffer({
		offerSettings,
	});

	return mapDtoToOfferEntity({
		dto: offerSettingsDto,
	});
}
