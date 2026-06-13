import {createOffer as createOfferService} from "../../../services";


export async function createOffer({data}){
	const createdOffer = await createOfferService({data});

	this.offers.push(createOffer);
	this.selectedOffer = createdOffer;
};
