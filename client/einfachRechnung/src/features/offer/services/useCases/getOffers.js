import {offerApi} from "../../api";
import {mapDtoToOfferEntities} from "../../mappers";


export async function getOffers({limit, page, customerId}){
	const params = new URLSearchParams();

	if(limit){
		params.set("limit", limit);
	}
	if(page){
		params.set("page", page);
	}
	if(customerId){
		params.set("customerId", customerId);
	}

	const getOffersResult = await offerApi.getOffers({
		query: `/offers/${params.toString()}`,
	});


	getOffersResult.items = mapDtoToOfferEntities({
		dtoOffers: getOffersResult.items,
	});

	return getOffersResult;
}
