import http from "@/shared/api/http.client.js";


async function getInvoices({query}){
	const {data} = await http.get(`/invoices`);

	return {
		items: data.items,
		pagination: data.pagination,
	};
}

async function getInvoiceById({invoiceId}){
	return {};
}

async function createInvoice({invoice}){
	return {};
}


export const invoiceApi = {
	getInvoices,
};
