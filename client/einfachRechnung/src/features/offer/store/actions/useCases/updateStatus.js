import {services} from "../../../services";


export async function updateStatus({newStatus}){
	const result = await services.updateStatus({
		offerNumber: this.offer.offerNumber,
		newStatus,
	});

	return result;
}
