// seed.js
// Run with:
// mongosh "mongodb://localhost:27017/einfachRechnung" seed.js

const userId = new ObjectId();

// -----------------------------------------------------------------------------
// Cleanup
// -----------------------------------------------------------------------------

db.customers.deleteMany({});
db.invoices.deleteMany({});
db.settings.deleteMany({});

// -----------------------------------------------------------------------------
// Settings
// -----------------------------------------------------------------------------

db.settings.insertOne({
	userId,

	company: {
		companyName: "Einfach Rechnung GmbH",
		ownerName: "Tom Mustermann",
		email: "info@einfach-rechnung.de",
		phone: "+492611234567",
		website: "https://einfach-rechnung.de",

		street: "Musterstraße 1",
		city: "Montabaur",
		postalCode: "56410",
		countryCode: "DE",

		vatId: "DE123456789",
		taxNumber: "12/345/67890",
	},

	email: {
		smtpHost: "smtp.example.com",
		smtpPort: 587,

		username: "mailer@example.com",
		password: "secret",

		fromEmail: "rechnung@einfach-rechnung.de",
		fromName: "Einfach Rechnung",

		secure: false,

		autoSendInvoices: false,

		replyToEmail: "support@einfach-rechnung.de",
	},

	invoice: {
		invoicePrefix: "RE",
		invoiceNumberStart: 1000,
		invoiceNumberFormat: "RE-{YEAR}-{NUMBER}",

		defaultPaymentTermsDays: 14,
		defaultDueDays: 14,

		currency: "EUR",
		language: "de",

		autoSendEnabled: false,

		defaultTaxRate: 19,
	},

	tax: {
		vatEnabled: true,
		defaultVatRate: 19,
		reducedVatRate: 7,
		taxCountryCode: "DE",
		reverseChargeEnabled: false,
	},
});

// -----------------------------------------------------------------------------
// Customers
// -----------------------------------------------------------------------------

const customer1Id = new ObjectId();
const customer2Id = new ObjectId();
const customer3Id = new ObjectId();
const customer4Id = new ObjectId();
const customer5Id = new ObjectId();

const customers = [
	{
		_id: customer1Id,
		userId,

		name: "Muster GmbH",
		street: "Hauptstraße 12",
		postalCode: "10115",
		city: "Berlin",
		countryCode: "DE",
		phone: "+49301234567",
		email: "info@muster-gmbh.de",
		vatId: "DE123456789",
	},
	{
		_id: customer2Id,
		userId,

		name: "Schmidt Handwerk",
		street: "Bahnhofstraße 8",
		postalCode: "50667",
		city: "Köln",
		countryCode: "DE",
		phone: "+49221123456",
		email: "kontakt@schmidt-handwerk.de",
		vatId: "DE234567890",
	},
	{
		_id: customer3Id,
		userId,

		name: "Meyer Consulting",
		street: "Am Markt 3",
		postalCode: "20095",
		city: "Hamburg",
		countryCode: "DE",
		phone: "+49401234567",
		email: "mail@meyer-consulting.de",
		vatId: "DE345678901",
	},
	{
		_id: customer4Id,
		userId,

		name: "Elektro Wagner",
		street: "Industriestraße 22",
		postalCode: "90402",
		city: "Nürnberg",
		countryCode: "DE",
		phone: "+49911234567",
		email: "service@elektro-wagner.de",
		vatId: "DE456789012",
	},
	{
		_id: customer5Id,
		userId,

		name: "Bäckerei Hoffmann",
		street: "Kirchplatz 5",
		postalCode: "01067",
		city: "Dresden",
		countryCode: "DE",
		phone: "+49351123456",
		email: "info@baeckerei-hoffmann.de",
		vatId: "DE567890123",
	},
];

db.customers.insertMany(customers);

// -----------------------------------------------------------------------------
// Invoice Helpers
// -----------------------------------------------------------------------------

function createInvoice({
	number,
	customer,
	netTotal,
	status,
	paymentStatus,
	invoiceDate,
}){
	const taxAmount = Number((netTotal * 0.19).toFixed(2));
	const grossTotal = Number((netTotal + taxAmount).toFixed(2));

	let paidAmount = 0;

	if (paymentStatus === "paid"){
		paidAmount = grossTotal;
	}

	if (paymentStatus === "partially_paid"){
		paidAmount = Number((grossTotal / 2).toFixed(2));
	}

	const openAmount = Number(
		(grossTotal - paidAmount).toFixed(2)
	);

	return {
		_id: new ObjectId(),

		userId,

		customerId: customer._id,

		invoiceNumber: `RE-2026-${String(number).padStart(4, "0")}`,

		seller: {
			companyName: "Einfach Rechnung GmbH",
			ownerName: "Tom Mustermann",
			email: "info@einfach-rechnung.de",
			phone: "+492611234567",

			street: "Musterstraße 1",
			city: "Montabaur",
			postalCode: "56410",
			countryCode: "DE",

			vatId: "DE123456789",
			taxNumber: "12/345/67890",
		},

		customer: {
			name: customer.name,
			street: customer.street,
			postalCode: customer.postalCode,
			city: customer.city,
			countryCode: customer.countryCode,
			phone: customer.phone,
			email: customer.email,
			vatId: customer.vatId,
		},

		invoiceDate,

		dueDate: new Date(
			invoiceDate.getTime() + (14 * 24 * 60 * 60 * 1000)
		),

		currency: "EUR",

		items: [
			{
				description: "Dienstleistung",
				quantity: 1,
				unitPrice: netTotal,
				total: netTotal,
			},
		],

		note: "",

		netTotal,
		taxAmount,
		grossTotal,

		paidAmount,
		openAmount,

		paymentStatus,
		status,

		payments:
			paymentStatus === "paid"
				? [
					{
						amount: grossTotal,
						paidAt: new Date(),
					},
				]
				: [],

		createdAt: invoiceDate,
		updatedAt: invoiceDate,
	};
}

// -----------------------------------------------------------------------------
// Invoices
// -----------------------------------------------------------------------------

const invoices = [
	createInvoice({
		number: 1001,
		customer: customers[0],
		netTotal: 500,
		status: "sent",
		paymentStatus: "paid",
		invoiceDate: new Date("2026-01-05"),
	}),
	createInvoice({
		number: 1002,
		customer: customers[1],
		netTotal: 850,
		status: "sent",
		paymentStatus: "open",
		invoiceDate: new Date("2026-01-07"),
	}),
	createInvoice({
		number: 1003,
		customer: customers[2],
		netTotal: 1200,
		status: "sent",
		paymentStatus: "paid",
		invoiceDate: new Date("2026-01-10"),
	}),
	createInvoice({
		number: 1004,
		customer: customers[3],
		netTotal: 350,
		status: "sent",
		paymentStatus: "open",
		invoiceDate: new Date("2026-01-12"),
	}),
	createInvoice({
		number: 1005,
		customer: customers[4],
		netTotal: 650,
		status: "sent",
		paymentStatus: "partially_paid",
		invoiceDate: new Date("2026-01-15"),
	}),
	createInvoice({
		number: 1006,
		customer: customers[0],
		netTotal: 950,
		status: "sent",
		paymentStatus: "paid",
		invoiceDate: new Date("2026-02-01"),
	}),
	createInvoice({
		number: 1007,
		customer: customers[1],
		netTotal: 780,
		status: "sent",
		paymentStatus: "open",
		invoiceDate: new Date("2026-02-04"),
	}),
	createInvoice({
		number: 1008,
		customer: customers[2],
		netTotal: 430,
		status: "sent",
		paymentStatus: "paid",
		invoiceDate: new Date("2026-02-08"),
	}),
	createInvoice({
		number: 1009,
		customer: customers[3],
		netTotal: 1100,
		status: "sent",
		paymentStatus: "paid",
		invoiceDate: new Date("2026-02-10"),
	}),
	createInvoice({
		number: 1010,
		customer: customers[4],
		netTotal: 720,
		status: "sent",
		paymentStatus: "open",
		invoiceDate: new Date("2026-02-14"),
	}),
	createInvoice({
		number: 1011,
		customer: customers[0],
		netTotal: 890,
		status: "sent",
		paymentStatus: "paid",
		invoiceDate: new Date("2026-03-01"),
	}),
	createInvoice({
		number: 1012,
		customer: customers[1],
		netTotal: 300,
		status: "draft",
		paymentStatus: "open",
		invoiceDate: new Date("2026-03-04"),
	}),
	createInvoice({
		number: 1013,
		customer: customers[2],
		netTotal: 1450,
		status: "sent",
		paymentStatus: "paid",
		invoiceDate: new Date("2026-03-08"),
	}),
	createInvoice({
		number: 1014,
		customer: customers[3],
		netTotal: 600,
		status: "sent",
		paymentStatus: "partially_paid",
		invoiceDate: new Date("2026-03-12"),
	}),
	createInvoice({
		number: 1015,
		customer: customers[4],
		netTotal: 500,
		status: "sent",
		paymentStatus: "paid",
		invoiceDate: new Date("2026-03-16"),
	}),
	createInvoice({
		number: 1016,
		customer: customers[0],
		netTotal: 1300,
		status: "sent",
		paymentStatus: "open",
		invoiceDate: new Date("2026-04-01"),
	}),
	createInvoice({
		number: 1017,
		customer: customers[1],
		netTotal: 470,
		status: "sent",
		paymentStatus: "paid",
		invoiceDate: new Date("2026-04-05"),
	}),
	createInvoice({
		number: 1018,
		customer: customers[2],
		netTotal: 990,
		status: "sent",
		paymentStatus: "paid",
		invoiceDate: new Date("2026-04-09"),
	}),
	createInvoice({
		number: 1019,
		customer: customers[3],
		netTotal: 560,
		status: "sent",
		paymentStatus: "open",
		invoiceDate: new Date("2026-04-12"),
	}),
	createInvoice({
		number: 1020,
		customer: customers[4],
		netTotal: 820,
		status: "sent",
		paymentStatus: "paid",
		invoiceDate: new Date("2026-04-18"),
	}),
];

db.invoices.insertMany(invoices);

print("Seed completed.");
print(`User ID: ${userId}`);
print(`Customers: ${customers.length}`);
print(`Invoices: ${invoices.length}`);
