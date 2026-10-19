import { services } from "../../../services";


export async function getOffers({ limit, page, customerId, filter } = {}) {
	const getOffersResult = await services.getOffers({
		limit,
		page,
		customerId,
		filter,
	});


	return getOffersResult;
}
