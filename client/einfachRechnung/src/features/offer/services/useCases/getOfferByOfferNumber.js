import {offerApi} from "../../api";
import {mapDtoToOfferEntity} from "../../mappers";


export async function getOfferByOfferNumber({offerNumber}){
	const getOfferResult = await offerApi.getOfferByOfferNumber({
		offerNumber,
	})

	return mapDtoToOfferEntity({
		dtoOffer: getOfferResult,
	})
};
