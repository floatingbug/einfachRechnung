import {services} from "../../../services";


export async function saveOffer({offer}){
	const savedOffer = await services.saveOffer({
		offer,
	});

	return savedOffer;
}
