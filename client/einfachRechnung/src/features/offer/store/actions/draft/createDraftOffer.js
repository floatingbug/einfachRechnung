import {createOfferEntity} from "../../../entities";


export function createDraftOffer({customerId}){
	this.draftOffer = {
		customerId,

		offerDate: "",
		validUntil: "",

		discountType: "percent",
		discountValue: 0,

		shippingCost: 15,
		shippingTaxRate: 19,

		introduction: "Vielen Dank für Ihre Anfrage.",

		notes: "",

		items: [],
	};

	console.log(this.draftOffer);
}
