import {services} from "../../services";


export async function getOffer(){
	const fetchedOfferSettings = await services.getOffer();
	this.offer = fetchedOfferSettings;

	return fetchedOfferSettings;
}
