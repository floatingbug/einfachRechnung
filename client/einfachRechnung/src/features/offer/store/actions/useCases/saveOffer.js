import {services} from "../../../services";


export async function saveOffer({offer}){
	const offerNumber = await services.saveOffer({
		offer,
	});

	return offerNumber;
}
