import http from "@/shared/api/http.client.js";


async function getInvoices({ query }) {
	const { data } = await http.get(`/invoices`, { params: query });

	return {
		invoices: data.invoices,
		pagination: data.pagination,
	};
}

async function getInvoiceById({ invoiceId }) {
	const { data } = await http.get(`/invoices/${invoiceId}`);

	return data;
}

async function createInvoice({ invoice, customerId }) {
	const { data } = await http.post(`/invoices`, { invoice, customerId });

	return data.invoiceNumber;
}

async function sendInvoice({ invoiceId }) {
	const { data } = await http.post(`/invoices/send/${invoiceId}`);
	return data;
}

async function getPdf({ invoiceNumber }) {
	const { data } = await http.get(`/invoices/pdf/${invoiceNumber}`, { responseType: "blob" });
	return data;
}

async function cancelInvoice({ invoiceNumber }) {
	const { data } = await http.patch(`/invoices/cancel/${invoiceNumber}`);
	return data;
}

async function registerPayment({ invoiceId, payment }) {
	const { data } = await http.post(`/invoices/payments/${invoiceId}`, payment);
	return data;
}

async function sendReminder({ invoiceId }) {
	const { data } = await http.post(`/invoices/reminders/${invoiceId}`);
	return data;
}

async function getInvoiceByInvoiceNumber({ invoiceNumber }) {
	const { data } = await http.get(
		`/invoices/by-invoice-number/${invoiceNumber}`
	);

	return data;
}

async function updateInvoice({ invoiceDraft, invoiceNumber }) {
	const { data } = await http.patch(
		`/invoices/${invoiceNumber}`,
		invoiceDraft,
	)

	// data is the updated invoice
	return data;
}

async function deleteInvoice({ invoiceNumber }) {
	await http.delete(
		`/invoices/${invoiceNumber}`
	);
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
	deleteInvoice,
};
