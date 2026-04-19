const STORAGE_KEY = "demo_state";

/**
 * --- helpers ---
 */

function loadState(){
	const raw = localStorage.getItem(STORAGE_KEY);

	if(!raw){
		return null;
	}

	try{
		return JSON.parse(raw);
	}
	catch(error){
		return null;
	}
}

function saveState(state){
	localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function ensureState(){
	let state = loadState();

	if(!state || !Array.isArray(state.invoices)){
		state = {
			invoices: []
		};

		saveState(state);
	}

	return state;
}

/**
 * --- utils ---
 */

function generateId(){
	return "inv_" + Math.random().toString(36).substring(2, 10);
}

function generateInvoiceNumber(state){
	const count = state.invoices.length + 1;
	return `2026-${1000 + count}`;
}

function calculateTotals(invoice){
	const net = invoice.items.reduce((sum, item) => {
		return sum + (item.quantity * item.unitPrice);
	}, 0);

	const taxMap = {};

	invoice.items.forEach((item) => {
		const itemNet = item.quantity * item.unitPrice;
		const tax = itemNet * (item.taxRate / 100);

		if(!taxMap[item.taxRate]){
			taxMap[item.taxRate] = 0;
		}

		taxMap[item.taxRate] += tax;
	});

	const taxTotal = Object.values(taxMap).reduce((a, b) => a + b, 0);

	return {
		net,
		taxTotal,
		gross: net + taxTotal
	};
}

/**
 * --- API (IMPORTANT: backend compatible) ---
 */

async function findById({ invoiceId }){
	const state = ensureState();

	const invoice = state.invoices.find((inv) => inv.id === invoiceId);

	if(!invoice){
		throw new Error("Invoice not found");
	}

	return {
		data: invoice
	};
}

/**
 * ✔️ MUST MATCH BACKEND STRUCTURE EXACTLY
 */
async function findMany({ query }){
	const state = ensureState();

	let invoices = Array.isArray(state.invoices)
		? [...state.invoices]
		: [];

	// filtering
	if(query){
		if(query.status){
			invoices = invoices.filter((inv) => inv.status === query.status);
		}

		if(query.customerName){
			const search = query.customerName.toLowerCase();

			invoices = invoices.filter((inv) => {
				return inv.customer?.name?.toLowerCase().includes(search);
			});
		}
	}

	const page = Number(query?.page || 1);
	const limit = Number(query?.limit || 20);

	const start = (page - 1) * limit;
	const end = start + limit;

	const paginatedItems = invoices.slice(start, end);

	return {
		data: {
			items: paginatedItems,
			pagination: {
				page,
				limit,
				total: invoices.length,
				totalPages: Math.ceil(invoices.length / limit)
			}
		}
	};
}

/**
 * create
 */
async function create(payload){
	const state = ensureState();

	const totals = calculateTotals(payload);

	const invoice = {
		...payload,

		id: generateId(),
		invoiceNumber: payload.invoiceNumber || generateInvoiceNumber(state),

		status: "draft",

		totals: {
			net: totals.net,
			tax: totals.taxTotal,
			gross: totals.gross
		},

		createdAt: new Date().toISOString()
	};

	state.invoices.unshift(invoice);

	saveState(state);

	return {
		data: invoice
	};
}

/**
 * update
 */
async function update({ invoiceId, payload }){
	const state = ensureState();

	const index = state.invoices.findIndex((inv) => inv.id === invoiceId);

	if(index === -1){
		throw new Error("Invoice not found");
	}

	const updated = {
		...state.invoices[index],
		...payload
	};

	const totals = calculateTotals(updated);

	updated.totals = {
		net: totals.net,
		tax: totals.taxTotal,
		gross: totals.gross
	};

	state.invoices[index] = updated;

	saveState(state);

	return {
		data: updated
	};
}

/**
 * remove
 */
async function remove({ invoiceId }){
	const state = ensureState();

	state.invoices = state.invoices.filter((inv) => inv.id !== invoiceId);

	saveState(state);

	return {
		data: true
	};
}

/**
 * send
 */
async function send({ invoiceId }){
	const state = ensureState();

	const invoice = state.invoices.find((inv) => inv.id === invoiceId);

	if(!invoice){
		throw new Error("Invoice not found");
	}

	invoice.status = "sent";
	invoice.sentAt = new Date().toISOString();

	saveState(state);

	return {
		data: invoice
	};
}

/**
 * reset
 */
async function reset(){
	localStorage.removeItem(STORAGE_KEY);

	return {
		data: true
	};
}

export default {
	findById,
	findMany,
	create,
	update,
	remove,
	send,
	reset
};
