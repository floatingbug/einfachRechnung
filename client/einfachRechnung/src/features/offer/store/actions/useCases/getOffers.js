import {services} from "../../../services";


export async function getOffers({limit, page}){
	const getOffersResult = await services.getOffers({
		limit,
		page,
	});


	return getOffersResult;
}
