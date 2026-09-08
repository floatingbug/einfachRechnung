import {services} from "../../../services";


export async function updateOffer(){
	const result = await services.updateOffer({
		offer: this.offer,
	});

	return result;
}
