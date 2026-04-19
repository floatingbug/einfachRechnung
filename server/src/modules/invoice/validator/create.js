const validator = require("validator");

function isPlainObject(value){
	return !!value && typeof value === "object" && !Array.isArray(value);
}

module.exports = async (req, res, next) => {
	const payload = req.body;

	if (!isPlainObject(payload)) {
		return res.status(400).json({
			error: "Invalid request body",
		});
	}

	const allowedKeys = [
		"seller",
		"customer",
		"invoiceDate",
		"dueDate",
		"currency",
		"items",
		"note",
	];

	const keys = Object.keys(payload);

	for (const key of keys) {
		if (!allowedKeys.includes(key)) {
			return res.status(400).json({
				error: `Field '${key}' is not allowed`,
			});
		}
	}

	if (!("seller" in payload)) {
		return res.status(400).json({
			error: "seller is required",
		});
	}

	if (!isPlainObject(payload.seller)) {
		return res.status(400).json({
			error: "seller must be a plain object",
		});
	}

	const allowedSellerKeys = [
		"name",
		"street",
		"city",
		"postalCode",
		"countryCode",
		"vatId",
		"email",
	];

	for (const key of Object.keys(payload.seller)) {
		if (!allowedSellerKeys.includes(key)) {
			return res.status(400).json({
				error: `Field 'seller.${key}' is not allowed`,
			});
		}
	}

	if (typeof payload.seller.name !== "string") {
		return res.status(400).json({
			error: "seller.name must be a string",
		});
	}

	payload.seller.name = payload.seller.name.trim();

	if (!validator.isLength(payload.seller.name, { min: 1, max: 100 })) {
		return res.status(400).json({
			error: "seller.name must be between 1 and 100 characters",
		});
	}

	if (typeof payload.seller.street !== "string") {
		return res.status(400).json({
			error: "seller.street must be a string",
		});
	}

	payload.seller.street = payload.seller.street.trim();

	if (!validator.isLength(payload.seller.street, { min: 1, max: 200 })) {
		return res.status(400).json({
			error: "seller.street must be between 1 and 200 characters",
		});
	}

	if (typeof payload.seller.city !== "string") {
		return res.status(400).json({
			error: "seller.city must be a string",
		});
	}

	payload.seller.city = payload.seller.city.trim();

	if (!validator.isLength(payload.seller.city, { min: 1, max: 100 })) {
		return res.status(400).json({
			error: "seller.city must be between 1 and 100 characters",
		});
	}

	if (typeof payload.seller.postalCode !== "string") {
		return res.status(400).json({
			error: "seller.postalCode must be a string",
		});
	}

	payload.seller.postalCode = payload.seller.postalCode.trim();

	if (!validator.isLength(payload.seller.postalCode, { min: 1, max: 20 })) {
		return res.status(400).json({
			error: "seller.postalCode must be between 1 and 20 characters",
		});
	}

	if (typeof payload.seller.countryCode !== "string") {
		return res.status(400).json({
			error: "seller.countryCode must be a string",
		});
	}

	payload.seller.countryCode = payload.seller.countryCode.trim().toUpperCase();

	if (!validator.isLength(payload.seller.countryCode, { min: 2, max: 2 })) {
		return res.status(400).json({
			error: "seller.countryCode must be a 2-character country code",
		});
	}

	if ("vatId" in payload.seller) {
		if (typeof payload.seller.vatId !== "string") {
			return res.status(400).json({
				error: "seller.vatId must be a string",
			});
		}

		payload.seller.vatId = payload.seller.vatId.trim();
	}

	if ("email" in payload.seller) {
		if (typeof payload.seller.email !== "string") {
			return res.status(400).json({
				error: "seller.email must be a string",
			});
		}

		const normalizedEmail = validator.normalizeEmail(payload.seller.email);

		if (!normalizedEmail || !validator.isEmail(normalizedEmail)) {
			return res.status(400).json({
				error: "seller.email must be a valid email address",
			});
		}

		payload.seller.email = normalizedEmail;
	}

	if (!("customer" in payload)) {
		return res.status(400).json({
			error: "customer is required",
		});
	}

	if (!isPlainObject(payload.customer)) {
		return res.status(400).json({
			error: "customer must be a plain object",
		});
	}

	const allowedCustomerKeys = [
		"name",
		"street",
		"city",
		"postalCode",
		"countryCode",
		"vatId",
		"email",
	];

	for (const key of Object.keys(payload.customer)) {
		if (!allowedCustomerKeys.includes(key)) {
			return res.status(400).json({
				error: `Field 'customer.${key}' is not allowed`,
			});
		}
	}

	if (typeof payload.customer.name !== "string") {
		return res.status(400).json({
			error: "customer.name must be a string",
		});
	}

	payload.customer.name = payload.customer.name.trim();

	if (!validator.isLength(payload.customer.name, { min: 1, max: 100 })) {
		return res.status(400).json({
			error: "customer.name must be between 1 and 100 characters",
		});
	}

	if (typeof payload.customer.street !== "string") {
		return res.status(400).json({
			error: "customer.street must be a string",
		});
	}

	payload.customer.street = payload.customer.street.trim();

	if (!validator.isLength(payload.customer.street, { min: 1, max: 200 })) {
		return res.status(400).json({
			error: "customer.street must be between 1 and 200 characters",
		});
	}

	if (typeof payload.customer.city !== "string") {
		return res.status(400).json({
			error: "customer.city must be a string",
		});
	}

	payload.customer.city = payload.customer.city.trim();

	if (!validator.isLength(payload.customer.city, { min: 1, max: 100 })) {
		return res.status(400).json({
			error: "customer.city must be between 1 and 100 characters",
		});
	}

	if (typeof payload.customer.postalCode !== "string") {
		return res.status(400).json({
			error: "customer.postalCode must be a string",
		});
	}

	payload.customer.postalCode = payload.customer.postalCode.trim();

	if (!validator.isLength(payload.customer.postalCode, { min: 1, max: 20 })) {
		return res.status(400).json({
			error: "customer.postalCode must be between 1 and 20 characters",
		});
	}

	if (typeof payload.customer.countryCode !== "string") {
		return res.status(400).json({
			error: "customer.countryCode must be a string",
		});
	}

	payload.customer.countryCode = payload.customer.countryCode.trim().toUpperCase();

	if (!validator.isLength(payload.customer.countryCode, { min: 2, max: 2 })) {
		return res.status(400).json({
			error: "customer.countryCode must be a 2-character country code",
		});
	}

	if ("vatId" in payload.customer) {
		if (typeof payload.customer.vatId !== "string") {
			return res.status(400).json({
				error: "customer.vatId must be a string",
			});
		}

		payload.customer.vatId = payload.customer.vatId.trim();
	}

	if ("email" in payload.customer) {
		if (typeof payload.customer.email !== "string") {
			return res.status(400).json({
				error: "customer.email must be a string",
			});
		}

		const normalizedEmail = validator.normalizeEmail(payload.customer.email);

		if (!normalizedEmail || !validator.isEmail(normalizedEmail)) {
			return res.status(400).json({
				error: "customer.email must be a valid email address",
			});
		}

		payload.customer.email = normalizedEmail;
	}

	if (!("invoiceDate" in payload)) {
		return res.status(400).json({
			error: "invoiceDate is required",
		});
	}

	if (typeof payload.invoiceDate !== "string") {
		return res.status(400).json({
			error: "invoiceDate must be a string",
		});
	}

	payload.invoiceDate = payload.invoiceDate.trim();

	if (!validator.isDate(payload.invoiceDate, { format: "YYYY-MM-DD", strictMode: true })) {
		return res.status(400).json({
			error: "invoiceDate must be a valid date in YYYY-MM-DD format",
		});
	}

	if (!("dueDate" in payload)) {
		return res.status(400).json({
			error: "dueDate is required",
		});
	}

	if (typeof payload.dueDate !== "string") {
		return res.status(400).json({
			error: "dueDate must be a string",
		});
	}

	payload.dueDate = payload.dueDate.trim();

	if (!validator.isDate(payload.dueDate, { format: "YYYY-MM-DD", strictMode: true })) {
		return res.status(400).json({
			error: "dueDate must be a valid date in YYYY-MM-DD format",
		});
	}

	if ("currency" in payload) {
		if (typeof payload.currency !== "string") {
			return res.status(400).json({
				error: "currency must be a string",
			});
		}

		payload.currency = payload.currency.trim().toUpperCase();

		if (!validator.isLength(payload.currency, { min: 3, max: 3 })) {
			return res.status(400).json({
				error: "currency must be a 3-character currency code",
			});
		}
	}
	else {
		payload.currency = "EUR";
	}

	if ("note" in payload) {
		if (typeof payload.note !== "string") {
			return res.status(400).json({
				error: "note must be a string",
			});
		}

		payload.note = payload.note.trim();

		if (!validator.isLength(payload.note, { min: 0, max: 2000 })) {
			return res.status(400).json({
				error: "note must be at most 2000 characters long",
			});
		}
	}

	if (!("items" in payload)) {
		return res.status(400).json({
			error: "items is required",
		});
	}

	if (!Array.isArray(payload.items)) {
		return res.status(400).json({
			error: "items must be an array",
		});
	}

	if (payload.items.length === 0) {
		return res.status(400).json({
			error: "items must contain at least one item",
		});
	}

	for (let index = 0; index < payload.items.length; index += 1) {
		const item = payload.items[index];

		if (!isPlainObject(item)) {
			return res.status(400).json({
				error: `items[${index}] must be a plain object`,
			});
		}

		const allowedItemKeys = [
			"name",
			"description",
			"quantity",
			"unitPrice",
			"taxRate",
		];

		for (const key of Object.keys(item)) {
			if (!allowedItemKeys.includes(key)) {
				return res.status(400).json({
					error: `Field 'items[${index}].${key}' is not allowed`,
				});
			}
		}

		if (typeof item.name !== "string") {
			return res.status(400).json({
				error: `items[${index}].name must be a string`,
			});
		}

		item.name = item.name.trim();

		if (!validator.isLength(item.name, { min: 1, max: 200 })) {
			return res.status(400).json({
				error: `items[${index}].name must be between 1 and 200 characters`,
			});
		}

		if ("description" in item) {
			if (typeof item.description !== "string") {
				return res.status(400).json({
					error: `items[${index}].description must be a string`,
				});
			}

			item.description = item.description.trim();

			if (!validator.isLength(item.description, { min: 0, max: 2000 })) {
				return res.status(400).json({
					error: `items[${index}].description must be at most 2000 characters long`,
				});
			}
		}

		if (typeof item.quantity !== "number" || !Number.isFinite(item.quantity)) {
			return res.status(400).json({
				error: `items[${index}].quantity must be a valid number`,
			});
		}

		if (!validator.isFloat(String(item.quantity), { gt: 0 })) {
			return res.status(400).json({
				error: `items[${index}].quantity must be greater than 0`,
			});
		}

		if (typeof item.unitPrice !== "number" || !Number.isFinite(item.unitPrice)) {
			return res.status(400).json({
				error: `items[${index}].unitPrice must be a valid number`,
			});
		}

		if (!validator.isFloat(String(item.unitPrice), { min: 0 })) {
			return res.status(400).json({
				error: `items[${index}].unitPrice must be greater than or equal to 0`,
			});
		}

		if (typeof item.taxRate !== "number" || !Number.isFinite(item.taxRate)) {
			return res.status(400).json({
				error: `items[${index}].taxRate must be a valid number`,
			});
		}

		if (!validator.isFloat(String(item.taxRate), { min: 0, max: 100 })) {
			return res.status(400).json({
				error: `items[${index}].taxRate must be between 0 and 100`,
			});
		}
	}

	return next();
};
