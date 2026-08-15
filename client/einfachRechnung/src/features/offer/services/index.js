import {calculateSubtotal} from "./calculations/calculateSubtotal.js";
import {saveOffer} from "./useCases/saveOffer.js";
import {getOfferTemplate} from "./useCases/getOfferTemplate.js";
import {getOffers} from "./useCases/getOffers.js";
import {getOfferByOfferNumber} from "./useCases/getOfferByOfferNumber.js";
import {updateOffer} from "./useCases/updateOffer.js";
import {deleteOffer} from "./useCases/deleteOffer.js";

import {getPdf} from "./useCases/getPdf.js";


export const services = {
	calculateSubtotal,
	saveOffer,
	getOfferTemplate,
	getOffers,
	getOfferByOfferNumber,
	updateOffer,
	deleteOffer,

	getPdf,
};
