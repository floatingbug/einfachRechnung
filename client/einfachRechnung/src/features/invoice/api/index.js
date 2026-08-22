import http from "@/shared/api/http.client.js";


async function getInvoices({query}){
	const {data} = await http.get(`/invoices`, { params: query });

	return {
		items: data.items,
		pagination: data.pagination,
	};
}

async function getInvoiceById({invoiceId}){
	const {data} = await http.get(`/invoices/${invoiceId}`);

	return data;
}

async function createInvoice({invoice, customerId}){
	const {data} = await http.post(`/invoices`, {invoice, customerId});

	return data.invoiceNumber;
}

async function sendInvoice({invoiceId}){
	const {data} = await http.post(`/invoices/${invoiceId}/send`);
	return data;
}

async function getPdf({invoiceId}){
	const {data} = await http.get(`/invoices/${invoiceId}/pdf`, {responseType: "blob"});
	return data;
}

async function cancelInvoice({invoiceId}){
	const {data} = await http.patch(`/invoices/${invoiceId}/cancel`);
	return data;
}

async function registerPayment({invoiceId, payment}){
	const {data} = await http.post(`/invoices/${invoiceId}/payments`, payment);
	return data;
}

async function sendReminder({invoiceId}){
	const {data} = await http.post(`/invoices/${invoiceId}/reminders`);
	return data;
}

async function getInvoiceByInvoiceNumber({invoiceNumber}){
	const {data} = await http.get(
		`/invoices/by-invoice-number/${invoiceNumber}`
	);

	return data;
}


export const invoiceApi = {
	getInvoices,
	getInvoiceById,
	createInvoice,
	sendInvoice,
	getPdf,
	cancelInvoice,
	registerPayment,
	sendReminder,
	getInvoiceByInvoiceNumber,
};
