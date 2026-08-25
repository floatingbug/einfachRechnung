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
	const {data} = await http.post(`/invoices/send/${invoiceId}`);
	return data;
}

async function getPdf({invoiceNumber}){
	const {data} = await http.get(`/invoices/pdf/${invoiceNumber}`, {responseType: "blob"});
	return data;
}

async function cancelInvoice({invoiceId}){
	const {data} = await http.patch(`/invoices/cancel/${invoiceId}`);
	return data;
}

async function registerPayment({invoiceId, payment}){
	const {data} = await http.post(`/invoices/payments/${invoiceId}`, payment);
	return data;
}

async function sendReminder({invoiceId}){
	const {data} = await http.post(`/invoices/reminders/${invoiceId}`);
	return data;
}

async function getInvoiceByInvoiceNumber({invoiceNumber}){
	const {data} = await http.get(
		`/invoices/by-invoice-number/${invoiceNumber}`
	);

	return data;
}

async function updateInvoice({invoiceDraft, invoiceNumber}){
	const {data} = await http.patch(
		`/invoices/${invoiceNumber}`,
		invoiceDraft,
	)

	// data is the updated invoice
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
	updateInvoice,
};
