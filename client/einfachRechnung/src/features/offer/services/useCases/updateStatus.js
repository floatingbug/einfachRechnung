import {offerApi} from "../../api";


export async function updateStatus({offerNumber, newStatus}){
	const result = await offerApi.updateStatus({
		offerNumber,
		newStatus,
	});

	return result;
}
