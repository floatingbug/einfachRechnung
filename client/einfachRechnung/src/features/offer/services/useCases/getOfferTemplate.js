import {offerApi} from "../../api";


export async function getOfferTemplate(){
	const offerTemplateDto = await offerApi.getOfferTemplate();

	return offerTemplateDto;
}
