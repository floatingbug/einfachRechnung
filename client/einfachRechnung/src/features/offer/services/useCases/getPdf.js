import {offerApi} from "../../api";


export async function getPdf({offerNumber}){
	const pdf = await offerApi.getPdf({
		offerNumber,
	});

	return pdf;
}
