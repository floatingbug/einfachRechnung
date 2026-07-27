import {offerApi} from "../../api";


export async function saveOffer({offer}){
	const offerDto = await offerApi.saveOffer({
		offer,
	});

	return offerDto;
}
