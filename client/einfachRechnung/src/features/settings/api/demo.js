// --- helpers ---
function getDemoState(){
	return JSON.parse(
		localStorage.getItem("demo_state")
	);
}


// --- api ---
async function findCompany(){
	const demoState = getDemoState();

	if(!demoState.settings) demoState.settings = {};

	return {
		data: {
			company: demoState.settings.company ?? {},
		},
	};
}

async function updateCompany({data}){
	const demoState = getDemoState();

	if(!demoState.settings) demoState.settings = {};

	demoState.settings.company = data;

	localStorage.setItem(
		"demo_state",
		JSON.stringify(demoState)
	);

	return {
		data: {
			company: demoState.settings.company,
		},
	};
}

async function findEmail(){
	const demoState = getDemoState();

	return {
		data: {
			email: demoState.settings?.email ?? null,
 		}
	};
}

async function updateEmail({data}){
	const demoState = getDemoState();

	demoState.settings.email = data;

	localStorage.setItem(
		"demo_state",
		JSON.stringify(demoState)
	);

	return {
		data: {
			email: demoState.settings?.email ?? null,
		}
	};
}

async function findInvoice(){
	const demoState = getDemoState();

	return {
		data: {
			invoice: demoState.settings?.invoice ?? null,
		},
	};
}

async function updateInvoice({data}){
	const demoState = getDemoState();

	demoState.settings.invoice = data;

	localStorage.setItem(
		"demo_state",
		JSON.stringify(demoState)
	);

	return {
		data: {
			invoice: demoState.settings.invoice,
		},
	};
}

async function findTax(){
	const demoState = getDemoState();

	return {
		data: {
			tax: demoState.settings?.tax ?? null,
		}
	};
}

async function updateTax({data}){
	const demoState = getDemoState();

	demoState.settings.tax = data;

	localStorage.setItem(
		"demo_state",
		JSON.stringify(demoState)
	);

	return {
		data: {
			tax: demoState.settings.tax,
		}
	};
}


export default {
	findInvoice,
	findCompany,
	findEmail,
	findTax,
	updateEmail,
	updateCompany,
	updateInvoice,
	updateTax,
};
