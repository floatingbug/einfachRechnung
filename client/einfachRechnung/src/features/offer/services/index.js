import {calculateSubtotal} from "./calculations/calculateSubtotal.js";
import {saveOffer} from "./useCases/saveOffer.js";
import {getOfferTemplate} from "./useCases/getOfferTemplate.js";


export const services = {
	calculateSubtotal,
	saveOffer,
	getOfferTemplate,
};
