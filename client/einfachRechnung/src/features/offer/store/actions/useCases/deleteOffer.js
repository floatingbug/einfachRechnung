import {services} from "../../../services";


export async function deleteOffer({offerNumber}){
	const result = await services.deleteOffer({
		offerNumber,
	});

	return result;
}
