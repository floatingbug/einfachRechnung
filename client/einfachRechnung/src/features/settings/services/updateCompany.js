import settingsApi from "../api";


export async function updateCompany({data}){
	const response = await settingsApi.updateCompany({data});

	return response.data.company;
}
