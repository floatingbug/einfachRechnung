import http from "@/shared/api/http.client.js";


async function createOffer({data}){
}

async function findOffers(){
}

async function getOfferTemplate(){
	const {data} = await http.get(
		"/offers/offer-template"
	);

	return data;
}

async function saveOffer({offer}){
	const {data} = await http.post(
		"/offers",
		offer
	);

	return data;
}


export default {
	createOffer,
	findOffers,
	saveOffer,
	getOfferTemplate,
};
