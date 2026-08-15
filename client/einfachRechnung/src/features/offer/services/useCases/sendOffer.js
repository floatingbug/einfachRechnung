import {offerApi} from "../../api";

export async function sendOffer({offerNumber}){
	return offerApi.sendOffer({offerNumber});
}
