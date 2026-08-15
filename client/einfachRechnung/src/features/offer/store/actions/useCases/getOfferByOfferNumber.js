import {services} from "../../../services";


export async function getOfferByOfferNumber({offerNumber}){
	const getOfferResult = await services.getOfferByOfferNumber({
		offerNumber,
	});

	return getOfferResult;
};
