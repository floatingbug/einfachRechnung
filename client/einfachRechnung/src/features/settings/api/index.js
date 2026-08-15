import http from "@/shared/api/http.client.js";


async function getCompany(){
	const {data} = await http.get("/settings/company");

	return data;
}

async function getEmail(){
	const {data} = await http.get("/settings/email");

	return data;
}

async function getInvoice(){
	const {data} = await http.get("/settings/invoice");

	return data;
}

async function getTax(){
	const {data} = await http.get("/settings/tax");

	return data;
}

async function getOffer(){
	const {data} = await http.get("/settings/offer");

	return data;
}

async function updateCompany({company}){
	const {data} = await http.put(
		"/settings/company",
		company,
	);

	return data;
}

async function updateInvoice({invoiceSettings}){
	const {data} = await http.put(
		"/settings/invoice",
		invoiceSettings,
	);

	return data;
}

async function updateTax({taxSettings}){
	const {data} = await http.put(
		"/settings/tax",
		taxSettings,
	);

	return data;
}

async function updateEmail({emailSettings}){
	const {data} = await http.put(
		"/settings/email",
		emailSettings,
	);

	return data;
}

async function updateOffer({offerSettings}){
	const {data} = await http.put(
		"/settings/offer",
		offerSettings,
	);
	return data;
}


export const settingsApi = {
	getCompany,
	getEmail,
	getInvoice,
	getTax,
	getOffer,
	updateCompany,
	updateInvoice,
	updateTax,
	updateEmail,
	updateOffer,
};
