import { offerApi } from "../../api";
import { mapDtoToOfferEntities } from "../../mappers";


export async function getOffers({ limit, page, customerId, filter }) {
	const params = new URLSearchParams();
	let filterString;

	if (limit) {
		params.set("limit", limit);
	}
	if (page) {
		params.set("page", page);
	}
	if (customerId) {
		params.set("customerId", customerId);
	}
	if (filter) {
		filterString = filter
			.map(f => `${f.field}:${f.value}`)
			.join(",");

		params.set("filter", filterString);
	}

	const getOffersResult = await offerApi.getOffers({
		query: `/offers/?${params.toString()}`,
	});


	getOffersResult.items = mapDtoToOfferEntities({
		dtoOffers: getOffersResult.items,
	});

	return getOffersResult;
}
