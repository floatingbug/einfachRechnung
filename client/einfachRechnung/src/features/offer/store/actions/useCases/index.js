import {saveOffer} from "./saveOffer.js";
import {getOfferTemplate} from "./getOfferTemplate.js";
import {getOffers} from "./getOffers.js";
import {getOfferByOfferNumber} from "./getOfferByOfferNumber.js";
import {updateOffer} from "./updateOffer.js";
import {deleteOffer} from "./deleteOffer.js";
import {updateStatus} from "./updateStatus.js";

import {getPdf} from "./getPdf.js";
import {sendOffer} from "./sendOffer.js";
import {convertToInvoice} from "./convertToInvoice.js";


export const useCases = {
	saveOffer,
	getOfferTemplate,
	getOffers,
	getOfferByOfferNumber,
	updateOffer,
	deleteOffer,
	updateStatus,

	getPdf,
	sendOffer,
	convertToInvoice,
};
