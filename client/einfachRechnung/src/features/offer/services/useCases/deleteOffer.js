import {offerApi} from "../../api";


export async function deleteOffer({offerNumber}){
	const result = await offerApi.deleteOffer({
		offerNumber,
	});

	return result;
}
