import {services} from "../../../services";

export async function getPdf({offerNumber}){
	const pdf = await services.getPdf({
		offerNumber,
	})

	return pdf;
}
