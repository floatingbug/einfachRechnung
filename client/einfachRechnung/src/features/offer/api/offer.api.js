import http from "@/shared/api/http.client.js";


async function getOffers({limit, page}){
	const {data} = await http.get(
		`/offers?limit=${limit}&page=${page}`
	);

	return data;
}


async function getOfferTemplate(){
	const {data} = await http.get(
		"/offers/offer-template"
	);

	return data;
}

async function getOfferByOfferNumber({offerNumber}){
	const {data} = await http.get(
		`/offers/${offerNumber}`
	);

	return data;
}

async function saveOffer({offer}){
	const {data} = await http.post(
		"/offers",
		offer
	);

	return data.offerNumber;
}

async function updateOffer({offer}){
	const {data} = await http.patch(
		"/offers",
		offer
	);

	return data;
}

async function getPdf({ offerNumber }) {
	const { data } = await http.get(
		`/offers/${offerNumber}/pdf`,
		{
			responseType: "blob",
		}
	);

	return data;
}

async function deleteOffer({offerNumber}){
	const {data} = await http.delete(
		`/offers/${offerNumber}`
	);

	return data;
}

async function sendOffer({offerNumber}){
	const {data} = await http.post(`/offers/${offerNumber}/send`);

	return data;
}

async function convertToInvoice({offerNumber}){
	const {data} = await http.post(`/offers/convert-to-invoice/${offerNumber}`);

	return data.invoiceNumber;
}


export default {
	getOffers,
	saveOffer,
	getOfferTemplate,
	getOfferByOfferNumber,
	updateOffer,
	deleteOffer,
	sendOffer,
	convertToInvoice,

	getPdf,
};
