import {offerApi} from "../../api";
import {mapDtoToOfferEntities} from "../../mappers";


export async function getOffers({limit, page}){

	const getOffersResult = await offerApi.getOffers({
		limit,
		page,
	});

	getOffersResult.items = mapDtoToOfferEntities({
		dtoOffers: getOffersResult.items,
	});

	return getOffersResult;
}
