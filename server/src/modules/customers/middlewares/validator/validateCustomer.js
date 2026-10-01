const validator = require("validator");
const { parsePhoneNumberFromString } = require("libphonenumber-js");


const allowedFields = new Set([
	"customerType",
	"companyName",
	"contactPerson",
	"firstName",
	"lastName",
	"street",
	"city",
	"postalCode",
	"email",
	"countryCode",
	"phone",
	"vatId",
	"bank",
]);

const allowedBankFields = new Set([
	"bankName",
	"iban",
	"bic",
]);


function isPlainObject(value) {
	return (
		value !== null &&
		typeof value === "object" &&
		!Array.isArray(value)
	);
}


function getUnknownFields(object, allowedFields) {
	return Object.keys(object)
		.filter(field => !allowedFields.has(field));
}


function isValidString(value) {
	return typeof value === "string";
}


function isValidLength(value, min, max) {
	return validator.isLength(value, { min, max });
}


function addError(errors, field, message) {
	if (!errors[field]) {
		errors[field] = [];
	}

	errors[field].push(message);
}


module.exports = (req, res, next) => {
	const errors = {};


	// --------------------------------------------------
	// Request body
	// --------------------------------------------------

	if (!isPlainObject(req.body)) {
		return res.status(400).json({
			error: {
				body: [
					"Der Request Body muss ein Objekt sein.",
				],
			},
		});
	}


	// --------------------------------------------------
	// Unknown fields
	// --------------------------------------------------

	const unknownFields = getUnknownFields(
		req.body,
		allowedFields
	);

	for (const field of unknownFields) {
		addError(
			errors,
			field,
			"Dieses Feld ist nicht erlaubt."
		);
	}


	let {
		customerType,
		companyName,
		contactPerson,
		firstName,
		lastName,
		street,
		city,
		postalCode,
		email,
		countryCode,
		phone,
		vatId,
		bank,
	} = req.body;


	// --------------------------------------------------
	// customerType
	// --------------------------------------------------

	if (!isValidString(customerType)) {
		addError(
			errors,
			"customerType",
			"customerType ist erforderlich und muss ein String sein."
		);
	}
	else {
		customerType = customerType.trim();

		if (!["company", "private"].includes(customerType)) {
			addError(
				errors,
				"customerType",
				'customerType muss entweder "company" oder "private" sein.'
			);
		}
	}

	// --------------------------------------------------
	// not alowed in field in customerType
	// --------------------------------------------------

    if(customerType === "company"){
        if(typeof firstName === "string"){
			addError(
				errors,
				"firstName",
				"firstName ist bei customerType: company nicht erlaubt."
			);
        }
        if(typeof lastName === "string"){
			addError(
				errors,
				"lastname",
				"lastName ist bei customerType: company nicht erlaubt."
			);
        }
    }
    if(customerType === "private"){
        if(typeof companyName === "string"){
			addError(
				errors,
				"companyName",
				"companyName ist bei customerType: private nicht erlaubt."
			);
        }
        if(typeof contactPerson === "streing"){
			addError(
				errors,
				"contactPerson",
				"contactPerson ist bei customerType: private nicht erlaubt."
			);
        }
    }


	// --------------------------------------------------
	// companyName
	// --------------------------------------------------

	if (customerType === "company") {
		if (!isValidString(companyName)) {
			addError(
				errors,
				"companyName",
				"Der Firmenname ist erforderlich."
			);
		}
		else {
			companyName = companyName.trim();

			if (!isValidLength(companyName, 1, 200)) {
				addError(
					errors,
					"companyName",
					"Der Firmenname muss zwischen 1 und 200 Zeichen enthalten."
				);
			}
		}
	}


	// --------------------------------------------------
	// contactPerson
	// --------------------------------------------------

	if (contactPerson !== undefined) {
		if (!isValidString(contactPerson)) {
			addError(
				errors,
				"contactPerson",
				"Die Kontaktperson muss ein String sein."
			);
		}
		else {
			contactPerson = contactPerson.trim();

			if (!isValidLength(contactPerson, 1, 200)) {
				addError(
					errors,
					"contactPerson",
					"Die Kontaktperson muss zwischen 1 und 200 Zeichen enthalten."
				);
			}
		}
	}


	// --------------------------------------------------
	// firstName
	// --------------------------------------------------

	if (customerType === "private") {
		if (!isValidString(firstName)) {
			addError(
				errors,
				"firstName",
				"Der Vorname ist erforderlich."
			);
		}
		else {
			firstName = firstName.trim();

			if (!isValidLength(firstName, 1, 100)) {
				addError(
					errors,
					"firstName",
					"Der Vorname muss zwischen 1 und 100 Zeichen enthalten."
				);
			}
		}
	}



	// --------------------------------------------------
	// lastName
	// --------------------------------------------------

	if (customerType === "private") {
		if (!isValidString(lastName)) {
			addError(
				errors,
				"lastName",
				"Der Nachname ist erforderlich."
			);
		}
		else {
			lastName = lastName.trim();

			if (!isValidLength(lastName, 1, 100)) {
				addError(
					errors,
					"lastName",
					"Der Nachname muss zwischen 1 und 100 Zeichen enthalten."
				);
			}
		}
	}


	// --------------------------------------------------
	// street
	// --------------------------------------------------

	if (!isValidString(street)) {
		addError(
			errors,
			"street",
			"Die Straße ist erforderlich und muss ein String sein."
		);
	}
	else {
		street = street.trim();

		if (!isValidLength(street, 1, 200)) {
			addError(
				errors,
				"street",
				"Die Straße muss zwischen 1 und 200 Zeichen enthalten."
			);
		}
	}


	// --------------------------------------------------
	// city
	// --------------------------------------------------

	if (!isValidString(city)) {
		addError(
			errors,
			"city",
			"Die Stadt ist erforderlich und muss ein String sein."
		);
	}
	else {
		city = city.trim();

		if (!isValidLength(city, 1, 100)) {
			addError(
				errors,
				"city",
				"Die Stadt muss zwischen 1 und 100 Zeichen enthalten."
			);
		}
	}


	// --------------------------------------------------
	// countryCode
	// --------------------------------------------------

	if (!isValidString(countryCode)) {
		addError(
			errors,
			"countryCode",
			"Der Ländercode ist erforderlich und muss ein String sein."
		);
	}
	else {
		countryCode = countryCode.trim().toUpperCase();

		if (!validator.isLength(countryCode, { min: 2, max: 2 })) {
			addError(
				errors,
				"countryCode",
				"Der Ländercode muss genau 2 Zeichen enthalten."
			);
		}
		else if (!validator.isAlpha(countryCode)) {
			addError(
				errors,
				"countryCode",
				"Der Ländercode darf nur Buchstaben enthalten."
			);
		}
		else if (!validator.isISO31661Alpha2(countryCode)) {
			addError(
				errors,
				"countryCode",
				"Der Ländercode muss ein gültiger ISO-3166-1-Alpha-2-Code sein."
			);
		}
	}


	// --------------------------------------------------
	// postalCode
	// --------------------------------------------------

	if (!isValidString(postalCode)) {
		addError(
			errors,
			"postalCode",
			"Die Postleitzahl ist erforderlich und muss ein String sein."
		);
	}
	else {
		postalCode = postalCode.trim();

		if (!isValidLength(postalCode, 1, 20)) {
			addError(
				errors,
				"postalCode",
				"Die Postleitzahl muss zwischen 1 und 20 Zeichen enthalten."
			);
		}
		else if (
			isValidString(countryCode) &&
			validator.isISO31661Alpha2(countryCode) &&
			!validator.isPostalCode(postalCode, countryCode)
		) {
			addError(
				errors,
				"postalCode",
				"Die Postleitzahl ist für das angegebene Land ungültig."
			);
		}
	}


	// --------------------------------------------------
	// email
	// --------------------------------------------------

	if (email !== undefined) {
		if (!isValidString(email)) {
			addError(
				errors,
				"email",
				"Die E-Mail-Adresse muss ein String sein."
			);
		}
		else {
			email = email.trim();

			if (!isValidLength(email, 1, 254)) {
				addError(
					errors,
					"email",
					"Die E-Mail-Adresse darf maximal 254 Zeichen enthalten."
				);
			}
			else if (!validator.isEmail(email)) {
				addError(
					errors,
					"email",
					"Die E-Mail-Adresse hat ein ungültiges Format."
				);
			}
		}
	}


	// --------------------------------------------------
	// phone
	// --------------------------------------------------

	if (phone !== undefined) {
		if (!isValidString(phone)) {
			addError(
				errors,
				"phone",
				"Die Telefonnummer muss ein String sein."
			);
		}
		else {
			phone = phone.trim();

			if (!isValidLength(phone, 3, 30)) {
				addError(
					errors,
					"phone",
					"Die Telefonnummer muss zwischen 3 und 30 Zeichen enthalten."
				);
			}
			else if (
				isValidString(countryCode) &&
				validator.isISO31661Alpha2(countryCode)
			) {
				const phoneNumber = parsePhoneNumberFromString(
					phone,
					countryCode
				);

				if (!phoneNumber || !phoneNumber.isValid()) {
					addError(
						errors,
						"phone",
						"Die Telefonnummer ist ungültig."
					);
				}
			}
		}
	}


	// --------------------------------------------------
	// vatId
	// --------------------------------------------------

	if (vatId !== undefined) {
		if (!isValidString(vatId)) {
			addError(
				errors,
				"vatId",
				"Die Umsatzsteuer-ID muss ein String sein."
			);
		}
		else {
			vatId = vatId.trim().toUpperCase();

			if (!isValidLength(vatId, 2, 30)) {
				addError(
					errors,
					"vatId",
					"Die Umsatzsteuer-ID muss zwischen 2 und 30 Zeichen enthalten."
				);
			}
			else if (
				isValidString(countryCode) &&
				validator.isISO31661Alpha2(countryCode) &&
				!validator.isVAT(vatId, countryCode)
			) {
				addError(
					errors,
					"vatId",
					"Die Umsatzsteuer-ID ist für das angegebene Land ungültig."
				);
			}
		}
	}


	// --------------------------------------------------
	// bank
	// --------------------------------------------------

	if (bank !== undefined) {
		if (!isPlainObject(bank)) {
			addError(
				errors,
				"bank",
				"Die Bankdaten müssen ein Objekt sein."
			);
		}
		else {
			const unknownBankFields = getUnknownFields(
				bank,
				allowedBankFields
			);

			for (const field of unknownBankFields) {
				addError(
					errors,
					`bank.${field}`,
					"Dieses Feld ist nicht erlaubt."
				);
			}


			// ------------------------------------------
			// bankName
			// ------------------------------------------

			if (bank.bankName !== undefined) {
				if (!isValidString(bank.bankName)) {
					addError(
						errors,
						"bank.bankName",
						"Der Bankname muss ein String sein."
					);
				}
				else {
					bank.bankName = bank.bankName.trim();

					if (!isValidLength(bank.bankName, 1, 200)) {
						addError(
							errors,
							"bank.bankName",
							"Der Bankname muss zwischen 1 und 200 Zeichen enthalten."
						);
					}
				}
			}


			// ------------------------------------------
			// iban
			// ------------------------------------------

			if (bank.iban !== undefined) {
				if (!isValidString(bank.iban)) {
					addError(
						errors,
						"bank.iban",
						"Die IBAN muss ein String sein."
					);
				}
				else {
					bank.iban = bank.iban
						.trim()
						.replace(/\s+/g, "")
						.toUpperCase();

					if (!validator.isIBAN(bank.iban)) {
						addError(
							errors,
							"bank.iban",
							"Die IBAN ist ungültig."
						);
					}
				}
			}


			// ------------------------------------------
			// bic
			// ------------------------------------------

			if (bank.bic !== undefined) {
				if (!isValidString(bank.bic)) {
					addError(
						errors,
						"bank.bic",
						"Der BIC muss ein String sein."
					);
				}
				else {
					bank.bic = bank.bic
						.trim()
						.toUpperCase();

					if (![8, 11].includes(bank.bic.length)) {
						addError(
							errors,
							"bank.bic",
							"Der BIC muss 8 oder 11 Zeichen enthalten."
						);
					}
					else if (!validator.isBIC(bank.bic)) {
						addError(
							errors,
							"bank.bic",
							"Der BIC ist ungültig."
						);
					}
				}
			}
		}
	}


	// --------------------------------------------------
	// Return all errors
	// --------------------------------------------------

	if (Object.keys(errors).length > 0) {
		return res.status(400).json({
			error: errors,
		});
	}


	// --------------------------------------------------
	// Write normalized values back to request body
	// --------------------------------------------------

	req.body.customerType = customerType;

	if (companyName !== undefined) {
		req.body.companyName = companyName;
	}

	if (contactPerson !== undefined) {
		req.body.contactPerson = contactPerson;
	}

	if (firstName !== undefined) {
		req.body.firstName = firstName;
	}

	if (lastName !== undefined) {
		req.body.lastName = lastName;
	}

	req.body.street = street;
	req.body.city = city;
	req.body.postalCode = postalCode;
	req.body.countryCode = countryCode;

	if (email !== undefined) {
		req.body.email = email;
	}

	if (phone !== undefined) {
		req.body.phone = phone;
	}

	if (vatId !== undefined) {
		req.body.vatId = vatId;
	}

	if (bank !== undefined) {
		req.body.bank = bank;
	}

	next();
};
