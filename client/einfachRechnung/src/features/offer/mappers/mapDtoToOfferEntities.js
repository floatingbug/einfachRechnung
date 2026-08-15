import {mapDtoToOfferEntity} from "./mapDtoToOfferEntity.js";


export function mapDtoToOfferEntities({dtoOffers}){
	return dtoOffers.map(dtoOffer => mapDtoToOfferEntity({dtoOffer}))
};
