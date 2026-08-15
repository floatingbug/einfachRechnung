import {services} from "../../services";


export async function updateOffer({offerSettings}){
	const updatedSettings = await services.updateOffer({
		offerSettings,
	});

	this.offer = updatedSettings;
	return updatedSettings;
}
