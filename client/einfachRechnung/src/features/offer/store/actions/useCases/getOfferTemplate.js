import {services} from "../../../services";


export async function getOfferTemplate(){
	const offerTemplate = await services.getOfferTemplate();

	return offerTemplate;
}
