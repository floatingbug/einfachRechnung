import {services} from "../../../services";


export async function getOfferByOfferNumber({offerNumber}){
	const offer = await services.getOfferByOfferNumber({
		offerNumber,
	});

	this.offer = offer;

	return offer;
};
