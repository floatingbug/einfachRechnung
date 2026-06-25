import http from "@/shared/api/http.client.js";


async function getCompany(){
	const {data} = await http.get("/settings/company");

	return data;
}

async function getEmail(){
	return {};
}

async function updateCompany({company}){
	const {data} = await http.put(
		"/settings/company",
		company,
	);

	return data;
}


export const settingsApi = {
	getCompany,
	getEmail,
	updateCompany,
};

