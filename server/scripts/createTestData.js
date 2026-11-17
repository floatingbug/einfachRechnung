// Generates a realistic demo dataset for an existing account.
// Covers users' customers, invoices, offers and settings - documents are a PDF
// cache and get created on demand, so they are intentionally skipped.
//
// Run with:
//   npm run create:test-data
//   npm run create:test-data -- --user=someone@example.com
//   npm run create:test-data -- --user=someone@example.com --yes
//
// The dataset is scoped to the given user, previous data of that user is
// replaced. In production an explicit --yes is required.

const config = require("../src/config");
const { connect, getDb, ObjectId, _client } = require("../src/db/mongo");
const { calculateTotals, roundCurrency } = require("../src/utils");
const settingsServices = require("../src/modules/settings/services");
const { company, customers, services, offerProjects } = require("./data/demoData");

const DEFAULT_USER_EMAIL = "user@user.de";
const PAYMENT_TERMS_DAYS = 14;
const INVOICES_PER_MONTH = 4;
const MONTHS = 11;
const INVOICE_PREFIX = "RE";
const OFFER_PREFIX = "";
const PAYMENT_METHODS = ["bank_transfer", "bank_transfer", "bank_transfer", "card", "cash", "paypal", "direct_debit"];

// -----------------------------------------------------------------------------
// Arguments
// -----------------------------------------------------------------------------

function parseArgs(argv){
	const args = {
		user: DEFAULT_USER_EMAIL,
		yes: false,
		dryRun: false,
	};

	for (const arg of argv){
		if (arg.startsWith("--user=")){
			args.user = arg.slice("--user=".length).trim().toLowerCase();
		}
		else if (arg === "--yes"){
			args.yes = true;
		}
		else if (arg === "--dry-run"){
			args.dryRun = true;
		}
		else{
			throw new Error(`Unknown argument: ${arg}`);
		}
	}

	return args;
}

// -----------------------------------------------------------------------------
// Deterministic random helpers (stable demos across runs)
// -----------------------------------------------------------------------------

function createRandom(seed){
	let state = seed;

	return function random(){
		state |= 0;
		state = (state + 0x6D2B79F5) | 0;

		let t = Math.imul(state ^ (state >>> 15), 1 | state);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const random = createRandom(20261117);

function randomInt(min, max){
	return min + Math.floor(random() * (max - min + 1));
}

function pick(list){
	return list[randomInt(0, list.length - 1)];
}

function chance(probability){
	return random() < probability;
}

// -----------------------------------------------------------------------------
// Date helpers
// -----------------------------------------------------------------------------

function startOfDay(date){
	const copy = new Date(date);
	copy.setHours(0, 0, 0, 0);

	return copy;
}

function addDays(date, days){
	const copy = new Date(date);
	copy.setDate(copy.getDate() + days);

	return copy;
}

function daysBetween(from, to){
	return Math.round((startOfDay(to) - startOfDay(from)) / (24 * 60 * 60 * 1000));
}

function monthsAgo(today, months, day){
	const date = new Date(today.getFullYear(), today.getMonth() - months, 1);

	date.setDate(Math.min(day, 28));

	return startOfDay(date);
}

// -----------------------------------------------------------------------------
// Snapshots
// -----------------------------------------------------------------------------

function toInvoiceCustomer(customer){
	return {
		customerType: customer.customerType,
		companyName: customer.companyName ?? "",
		contactPerson: customer.contactPerson ?? "",
		firstName: customer.firstName ?? "",
		lastName: customer.lastName ?? "",
		street: customer.street,
		postalCode: customer.postalCode,
		city: customer.city,
		countryCode: customer.countryCode ?? "DE",
		phone: customer.phone,
		email: customer.email,
		vatId: customer.vatId ?? "",
	};
}

function toOfferCustomer(customer){
	return {
		_id: customer._id,
		customerNumber: customer.customerNumber ?? "",
		customerType: customer.customerType,
		companyName: customer.companyName ?? null,
		contactPerson: customer.contactPerson ?? null,
		firstName: customer.firstName ?? null,
		lastName: customer.lastName ?? null,
		street: customer.street,
		postalCode: customer.postalCode,
		city: customer.city,
		countryCode: customer.countryCode ?? "DE",
		email: customer.email,
		phone: customer.phone,
		vatId: customer.vatId ?? null,
	};
}

function customerName(customer){
	return customer.customerType === "company"
		? customer.companyName
		: [customer.firstName, customer.lastName].filter(Boolean).join(" ");
}

// -----------------------------------------------------------------------------
// Documents
// -----------------------------------------------------------------------------

function buildItems(){
	const count = randomInt(1, 4);
	const items = [];

	for (let i = 0; i < count; i++){
		const service = pick(services);
		let quantity;

		if (service.unit === "Pauschal"){
			quantity = 1;
		}
		else if (service.unit === "m"){
			quantity = randomInt(8, 40);
		}
		else if (service.unit === "Std."){
			quantity = randomInt(1, 9);
		}
		else{
			quantity = randomInt(1, 12);
		}

		const item = {
			title: service.title,
			description: service.description,
			quantity,
			unit: service.unit,
			unitPrice: service.unitPrice,
			taxRate: service.taxRate,
			discountType: "none",
			discountValue: 0,
		};

		if (chance(0.15) && item.unitPrice * quantity > 100){
			item.discountType = chance(0.6) ? "percentage" : "fixed";
			item.discountValue = item.discountType === "percentage" ? 10 : randomInt(20, 60);
		}

		items.push(item);
	}

	// Add a fixed fee so small invoices still look plausible.
	if (chance(0.5) && !items.some((item) => item.title === "Anfahrt")){
		const travel = services.find((service) => service.title === "Anfahrt");

		items.unshift({
			title: travel.title,
			description: travel.description,
			quantity: 1,
			unit: travel.unit,
			unitPrice: travel.unitPrice,
			taxRate: travel.taxRate,
			discountType: "none",
			discountValue: 0,
		});
	}

	return items;
}

function buildPayment({ totals, invoiceDate, today, target }){
	const gross = totals.totalGross;

	if (target === "unpaid"){
		return {
			method: pick(PAYMENT_METHODS),
			paidAmount: 0,
			openAmount: gross,
			status: "unpaid",
			payments: [],
		};
	}

	const share = target === "paid" ? 1 : 0.3 + random() * 0.4;
	const paidAmount = target === "paid" ? gross : roundCurrency(gross * share);
	const openAmount = roundCurrency(gross - paidAmount);
	const latestPaymentDate = new Date(Math.min(addDays(invoiceDate, 18).getTime(), today.getTime()));
	const paymentSpan = Math.max(0, daysBetween(invoiceDate, latestPaymentDate));
	const paidAt = startOfDay(addDays(invoiceDate, randomInt(0, paymentSpan)));

	return {
		method: target === "paid" ? pick(PAYMENT_METHODS) : "bank_transfer",
		paidAmount,
		openAmount,
		status: openAmount === 0 ? "paid" : "partial",
		payments: [
			{
				amount: paidAmount,
				method: "bank_transfer",
				paidAt,
				note: "",
			},
		],
	};
}

function buildInvoice({ customer, invoiceDate, today, number, paymentTarget, status }){
	const items = buildItems();
	const totals = calculateTotals(items);
	const dueDate = addDays(invoiceDate, PAYMENT_TERMS_DAYS);
	const createdAt = addDays(invoiceDate, -1);

	return {
		userId: null,
		customerId: customer._id,
		invoiceNumber: number,
		type: "invoice",
		status,
		currency: "EUR",
		note: "",
		invoiceDate,
		dueDate,
		serviceDate: invoiceDate,
		items,
		totals,
		payment: status === "draft"
			? {
				method: "",
				paidAmount: 0,
				openAmount: totals.totalGross,
				status: "unpaid",
				payments: [],
			}
			: buildPayment({ totals, invoiceDate, today, target: paymentTarget }),
		customer: toInvoiceCustomer(customer),
		seller: {
			bank: company.bank,
			companyName: company.companyName,
			ownerName: company.ownerName,
			email: company.email,
			phone: company.phone,
			website: company.website,
			street: company.street,
			postalCode: company.postalCode,
			city: company.city,
			countryCode: company.countryCode,
			vatId: company.vatId,
			taxNumber: company.taxNumber,
		},
		createdAt,
		updatedAt: invoiceDate,
	};
}

function buildOffer({ customer, offerDate, validUntil, number, status, template }){
	const items = buildItems();
	const totals = calculateTotals(items);

	return {
		userId: null,
		customerId: customer._id,
		offerNumber: number,
		customerName: customerName(customer),
		contactPerson: customer.contactPerson ?? "",
		offerDate,
		validUntil,
		project: template.project,
		introduction: template.introduction,
		closing: template.closing,
		showTaxRatePerItem: chance(0.4),
		showItemNumbers: true,
		items,
		subtotalNet: totals.subtotalNet,
		discountNet: totals.discountNet,
		totalNet: totals.totalNet,
		totalTax: totals.totalTax,
		totalGross: totals.totalGross,
		taxBreakdown: totals.taxBreakdown,
		status,
		customerSnapshot: toOfferCustomer(customer),
		companySnapshot: {
			companyName: company.companyName,
			ownerName: company.ownerName,
			street: company.street,
			postalCode: company.postalCode,
			city: company.city,
			countryCode: company.countryCode,
			email: company.email,
			phone: company.phone,
			website: company.website,
			vatId: company.vatId,
			taxNumber: company.taxNumber,
		},
		createdAt: addDays(offerDate, -1),
		updatedAt: offerDate,
	};
}

// -----------------------------------------------------------------------------
// Steps
// -----------------------------------------------------------------------------

async function findUser(db, email){
	const user = await db.collection("users").findOne({ email });

	if (!user){
		throw new Error(
			`Kein Konto mit der E-Mail "${email}" gefunden.\n` +
			`Lege es zuerst an (npm run create:test-user oder Registrierung in der App).`
		);
	}

	return user;
}

async function resetUserData(db, userId){
	const result = {};

	for (const collection of ["customers", "invoices", "offers"]){
		result[collection] = (await db.collection(collection).deleteMany({ userId })).deletedCount;
	}

	result.settings = (await db.collection("settings").deleteMany({ userId })).deletedCount;

	return result;
}

async function createSettings(db, userId, { nextInvoiceNumber, nextOfferNumber }){
	await settingsServices.createDefaultSettings({ userId });

	await db.collection("settings").updateOne(
		{ userId },
		{
			$set: {
				company: {
					companyName: company.companyName,
					ownerName: company.ownerName,
					email: company.email,
					phone: company.phone,
					website: company.website,
					street: company.street,
					postalCode: company.postalCode,
					city: company.city,
					countryCode: company.countryCode,
					logo: null,
					greeting: company.greeting,
					bank: company.bank,
					vatId: company.vatId,
					taxNumber: company.taxNumber,
				},
				email: {
					senderName: company.companyName,
					replyTo: company.email,
					offerSubject: "Ihr Angebot",
					offerMessage: "Anbei erhalten Sie unser Angebot. Für Rückfragen stehen wir Ihnen gerne zur Verfügung.",
					invoiceSubject: "Ihre Rechnung",
					invoiceMessage: "Anbei erhalten Sie unsere Rechnung. Bitte überweisen Sie den Betrag innerhalb des Zahlungsziels.",
					autoSendEnabled: false,
				},
				invoice: {
					invoicePrefix: INVOICE_PREFIX,
					invoiceNumberFormat: "{prefix}{year}-{number}",
					nextInvoiceNumber,
					paymentTermsDays: PAYMENT_TERMS_DAYS,
					currency: "EUR",
					language: "de",
					introduction: "Vielen Dank für Ihren Auftrag.",
					closing: "Vielen Dank für Ihr Vertrauen.\nFür Rückfragen stehen wir Ihnen gerne zur Verfügung.",
					showItemNumbers: true,
					showTaxRatePerItem: false,
					taxRate: 19,
				},
				offer: {
					offerPrefix: OFFER_PREFIX,
					offerNumberFormat: "{prefix}{year}-{number}",
					nextOfferNumber,
					validityDays: 14,
					introduction: "Vielen Dank für Ihre Anfrage.\nGerne unterbreiten wir Ihnen folgendes Angebot.",
					closing: "Wir freuen uns auf Ihren Auftrag.\nFür Rückfragen stehen wir Ihnen jederzeit gerne zur Verfügung.",
					showItemNumbers: true,
					showTaxRatePerItem: false,
					taxRate: 19,
				},
			},
		}
	);
}

async function createCustomers(db, userId){
	const docs = customers.map((customer, index) => ({
		...customer,
		userId,
		customerNumber: `K-${index + 1}`,
		countryCode: customer.countryCode ?? "DE",
	}));

	const result = await db.collection("customers").insertMany(docs);

	return docs.map((doc, index) => ({
		...doc,
		_id: result.insertedIds[index],
	}));
}

function buildInvoicePlan(today){
	const dates = [];

	for (let months = MONTHS; months >= 0; months--){
		const perMonth = months === 0 ? INVOICES_PER_MONTH + 2 : INVOICES_PER_MONTH;

		for (let i = 0; i < perMonth; i++){
			// Never create documents in the future: the current month is capped at today.
			const day = months === 0 ? randomInt(1, today.getDate()) : randomInt(2, 28);

			dates.push(monthsAgo(today, months, day));
		}
	}

	dates.sort((a, b) => a - b);

	const sequence = {};
	const plan = dates.map((invoiceDate) => {
		const year = invoiceDate.getFullYear();

		sequence[year] = (sequence[year] ?? 0) + 1;

		const age = daysBetween(invoiceDate, today);
		let paymentTarget;

		if (age > 45){
			paymentTarget = chance(0.85) ? "paid" : (chance(0.5) ? "partial" : "unpaid");
		}
		else if (age > 15){
			paymentTarget = chance(0.55) ? "paid" : (chance(0.45) ? "partial" : "unpaid");
		}
		else{
			paymentTarget = chance(0.3) ? "paid" : (chance(0.35) ? "partial" : "unpaid");
		}

		return {
			invoiceDate,
			number: `${INVOICE_PREFIX}${year}-${String(sequence[year]).padStart(5, "0")}`,
			paymentTarget,
			status: "sent",
		};
	});

	// Two drafts in the current month and one cancelled document in the past.
	const currentMonthIndexes = plan
		.map((entry, index) => ({ entry, index }))
		.filter(({ entry }) => entry.invoiceDate.getMonth() === today.getMonth() && entry.invoiceDate.getFullYear() === today.getFullYear())
		.slice(-2);

	for (const { index } of currentMonthIndexes){
		plan[index].status = "draft";
		plan[index].paymentTarget = "unpaid";
	}

	const cancelled = plan[Math.floor(plan.length / 2)];
	cancelled.status = "cancelled";
	cancelled.paymentTarget = "unpaid";

	// Keep at least two recent partial payments that are not overdue yet, so the
	// dashboard shows a realistic spread of payment states.
	const partialCandidates = plan
		.filter((entry) => entry.status === "sent" && entry !== cancelled)
		.slice(-2);

	for (const entry of partialCandidates){
		entry.paymentTarget = "partial";
	}

	return {
		plan,
		nextInvoiceNumber: (sequence[today.getFullYear()] ?? 0) + 1,
	};
}

async function createInvoices(db, userId, customerDocs, today){
	const { plan, nextInvoiceNumber } = buildInvoicePlan(today);
	const docs = plan.map((entry) => ({
		...buildInvoice({
			customer: pick(customerDocs),
			invoiceDate: entry.invoiceDate,
			today,
			number: entry.number,
			paymentTarget: entry.paymentTarget,
			status: entry.status,
		}),
		userId,
	}));

	await db.collection("invoices").insertMany(docs);

	return {
		count: docs.length,
		nextInvoiceNumber,
		drafts: docs.filter((doc) => doc.status === "draft").length,
		paid: docs.filter((doc) => doc.payment.status === "paid").length,
		partial: docs.filter((doc) => doc.payment.status === "partial").length,
		unpaid: docs.filter((doc) => doc.payment.status === "unpaid").length,
	};
}

async function createOffers(db, userId, customerDocs, today){
	const states = [
		{ status: "draft", age: 2, validity: 14 },
		{ status: "draft", age: 6, validity: 14 },
		{ status: "draft", age: 11, validity: 21 },
		{ status: "sent", age: 4, validity: 21 },
		{ status: "sent", age: 9, validity: 28 },
		{ status: "accepted", age: 18, validity: 30 },
		{ status: "accepted", age: 33, validity: 30 },
		{ status: "expired", age: 60, validity: 21 },
	];

	const entries = states
		.map((state) => ({
			...state,
			offerDate: addDays(today, -state.age),
		}))
		.sort((a, b) => a.offerDate - b.offerDate);

	const sequence = {};
	const docs = entries.map((entry, index) => {
		const year = entry.offerDate.getFullYear();

		sequence[year] = (sequence[year] ?? 0) + 1;

		return {
			...buildOffer({
				customer: customerDocs[index % customerDocs.length],
				offerDate: entry.offerDate,
				validUntil: addDays(entry.offerDate, entry.validity),
				number: `${OFFER_PREFIX}${year}-${String(sequence[year]).padStart(5, "0")}`,
				status: entry.status,
				template: offerProjects[index % offerProjects.length],
			}),
			userId,
		};
	});

	await db.collection("offers").insertMany(docs);

	return {
		count: docs.length,
		nextOfferNumber: (sequence[today.getFullYear()] ?? 0) + 1,
	};
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

async function main(){
	const args = parseArgs(process.argv.slice(2));

	if (config.env === "production" && !args.yes){
		throw new Error(
			"NODE_ENV=production: bestehende Daten werden ersetzt.\n" +
			"Bestätige mit --yes, wenn das gewünscht ist."
		);
	}

	console.log("");
	console.log(`Testdaten für: ${args.user}`);
	console.log(`Datenbank:     ${config.dbName} (${config.mongoUri})`);
	console.log(`Umgebung:      ${config.env}`);
	console.log("");

	await connect();

	const db = getDb();
	const user = await findUser(db, args.user);
	const userId = user._id;

	if (args.dryRun){
		console.log("Dry run - es werden keine Daten geschrieben.");
		console.log(await db.collection("customers").countDocuments({ userId }), "Kunden,",
			await db.collection("invoices").countDocuments({ userId }), "Rechnungen,",
			await db.collection("offers").countDocuments({ userId }), "Angebote würden ersetzt.");
		console.log("");
		return;
	}

	const deleted = await resetUserData(db, userId);
	const today = startOfDay(new Date());

	const customerDocs = await createCustomers(db, userId);
	const invoices = await createInvoices(db, userId, customerDocs, today);
	const offers = await createOffers(db, userId, customerDocs, today);

	await createSettings(db, userId, {
		nextInvoiceNumber: invoices.nextInvoiceNumber,
		nextOfferNumber: offers.nextOfferNumber,
	});

	console.log("Ersetzt:", JSON.stringify(deleted));
	console.log("");
	console.log("Neu angelegt");
	console.log(`  Kunden:    ${customerDocs.length}`);
	console.log(`  Rechnungen:${String(invoices.count).padStart(4)} (bezahlt ${invoices.paid}, teilweise ${invoices.partial}, offen ${invoices.unpaid}, Entwürfe ${invoices.drafts})`);
	console.log(`  Angebote:  ${offers.count}`);
	console.log(`  Settings:  ${company.companyName}`);
	console.log("");
}

main()
	.catch((error) => {
		console.error("");
		console.error(error.message ?? error);
		console.error("");
		process.exitCode = 1;
	})
	.finally(async () => {
		await _client()?.close();
	});
