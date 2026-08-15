import {services} from "../../../services";

export function sendOffer({offerNumber}){
	return services.sendOffer({offerNumber});
}
