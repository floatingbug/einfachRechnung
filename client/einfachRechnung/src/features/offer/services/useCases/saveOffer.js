import {offerApi} from "../../api";


export async function saveOffer({offer}){
	const offerNumber = await offerApi.saveOffer({
		offer,
	});

	return offerNumber;
}
