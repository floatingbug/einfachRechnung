import {offerApi} from "../../api";


export async function updateOffer({offer}){
	const offerPayload = {
		offerNumber: offer.offerNumber,

		customerId: offer.customerId,
		customerName: offer.customerName,

		offerDate: offer.offerDate,
		validUntil: offer.validUntil,

		project: offer.project,

		introduction: offer.introduction,

		closing: offer.closing,

		showTaxRatePerItem: offer.showTaxRatePerItem,

		items: offer.items,

		status: offer.status,
	};

	if(offer.contactPerson){
		offerPayload.contactPerson = offer.contactPerson;
	}

	const result = offerApi.updateOffer({
		offer: offerPayload,
	});

	return result;
}
