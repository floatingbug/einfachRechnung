import {services} from "../../../services";


export async function getOffers({limit, page, customerId = null}){
	const getOffersResult = await services.getOffers({
		limit,
		page,
		customerId,
	});


	return getOffersResult;
}
