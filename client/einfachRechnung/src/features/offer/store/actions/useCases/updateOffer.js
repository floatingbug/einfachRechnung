import {services} from "../../../services";


export async function updateOffer({offer}){
	const result = await services.updateOffer({
		offer,
	});

	return result;
}
