db.settings.insertOne({
	userId: ObjectId("USER_ID"),

	company: {
		companyName: "",
		ownerName: "",
		email: "",
		phone: "",
		website: "",

		street: "",
		city: "",
		postalCode: "",
		countryCode: "",

		vatId: "",
		taxNumber: "",
	},

	email: {
		smtpHost: "",
		smtpPort: 587,

		username: "",
		password: "",

		fromEmail: "",
		fromName: "",

		secure: false,

		autoSendInvoices: false,

		replyToEmail: "",
	},

	invoice: {
		invoicePrefix: "",
		invoiceNumberStart: 0,
		invoiceNumberFormat: "",

		defaultPaymentTermsDays: 0,
		defaultDueDays: 0,

		currency: "",
		language: "",

		autoSendEnabled: false,

		defaultTaxRate: 0,
	},

	tax: {
		vatEnabled: true,
		defaultVatRate: 19,
		reducedVatRate: 7,
		taxCountryCode: "DE",
		reverseChargeEnabled: false,
	},
});
