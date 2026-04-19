import http from "@/shared/api/http.client.js";


async function findById({invoiceId}){
	return http.get(`/invoice/${invoiceId}`);
}

async function findMany({query}){
	const queryString = `?${new URLSearchParams(query).toString()}`;

	return http.get(`/invoice${queryString}`);
}

async function create(payload){
	return http.post("/invoice", payload);
}


export default {
	findById,
	findMany,
	create,
};
