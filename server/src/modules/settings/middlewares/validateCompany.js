const validator = require("validator");

function addError(errors, field, message){
    if (!errors[field]) {
        errors[field] = [];
    }

    errors[field].push(message);
}

module.exports = (req, res, next) => {
    const errors = {};
    const payload = req.body || {};

    const allowedFields = [
        "companyName",
        "ownerName",
        "email",
        "phone",
        "website",
        "vatId",
        "taxNumber",
        "street",
        "city",
        "postalCode",
        "countryCode",
    ];

    // Reject unknown fields
    for (const field of Object.keys(payload)) {
        if (!allowedFields.includes(field)) {
            addError(errors, field, "Field is not allowed.");
        }
    }

    // Normalize strings
    for (const field of allowedFields) {
        if (typeof payload[field] === "string") {
            payload[field] = payload[field].trim();

            if (payload[field] === "") {
                payload[field] = null;
            }
        }
    }

    const company = {
        companyName: payload.companyName ?? null,
        ownerName: payload.ownerName ?? null,
        email: payload.email ?? null,
        phone: payload.phone ?? null,
        website: payload.website ?? null,
        vatId: payload.vatId ?? null,
        taxNumber: payload.taxNumber ?? null,
        street: payload.street ?? null,
        city: payload.city ?? null,
        postalCode: payload.postalCode ?? null,
        countryCode: payload.countryCode ?? null,
    };

    // companyName
    if (company.companyName === null) {
        addError(
            errors,
            "companyName",
            "Firmenname ist erforderlich."
        );
    }
    else {
        if (typeof company.companyName !== "string") {
            addError(
                errors,
                "companyName",
                "Firmenname muss eine Zeichenkette sein."
            );
        }
        else if (!validator.isLength(company.companyName, { min: 1, max: 100 })) {
            addError(
                errors,
                "companyName",
                "Firmenname muss zwischen 1 und 100 Zeichen lang sein."
            );
        }
    }

    // ownerName
    if (company.ownerName !== null) {
        if (typeof company.ownerName !== "string") {
            addError(
                errors,
                "ownerName",
                "Name des Besitzers muss eine Zeichenkette sein."
            );
        }
        else if (!validator.isLength(company.ownerName, { max: 100 })) {
            addError(
                errors,
                "ownerName",
                "Name des Besitzers darf nicht länger als 100 Zeichen sein."
            );
        }
    }

    // email
    if (company.email !== null) {
        if (typeof company.email !== "string") {
            addError(
                errors,
                "email",
                "E-Mail muss eine Zeichenkette sein."
            );
        }
        else {
            if (!validator.isLength(company.email, { max: 254 })) {
                addError(
                    errors,
                    "email",
                    "E-Mail darf nicht länger als 254 Zeichen sein."
                );
            }

            if (!validator.isEmail(company.email)) {
                addError(
                    errors,
                    "email",
                    "Ungültige E-Mail-Adresse."
                );
            }
        }
    }

    // phone
    if (company.phone !== null) {
        if (typeof company.phone !== "string") {
            addError(
                errors,
                "phone",
                "Telefonnummer muss eine Zeichenkette sein."
            );
        }
        else if (!validator.isLength(company.phone, { max: 30 })) {
            addError(
                errors,
                "phone",
                "Telefonnummer darf nicht länger als 30 Zeichen sein."
            );
        }
    }

    // website
    if (company.website !== null) {
        if (typeof company.website !== "string") {
            addError(
                errors,
                "website",
                "Webseite muss eine Zeichenkette sein."
            );
        }
        else {
            if (!validator.isLength(company.website, { max: 255 })) {
                addError(
                    errors,
                    "website",
                    "Webseite darf nicht länger als 255 Zeichen sein."
                );
            }

            if (!validator.isURL(company.website, {
                protocols: ["http", "https"],
                require_protocol: true,
            })) {
                addError(
                    errors,
                    "website",
                    "Ungültige Webseite."
                );
            }
        }
    }

    // vatId
    if (company.vatId !== null) {
        if (typeof company.vatId !== "string") {
            addError(
                errors,
                "vatId",
                "Umsatzsteuer-ID muss eine Zeichenkette sein."
            );
        }
        else if (!validator.isLength(company.vatId, { max: 30 })) {
            addError(
                errors,
                "vatId",
                "Umsatzsteuer-ID darf nicht länger als 30 Zeichen sein."
            );
        }
    }

    // taxNumber
    if (company.taxNumber !== null) {
        if (typeof company.taxNumber !== "string") {
            addError(
                errors,
                "taxNumber",
                "Steuernummer muss eine Zeichenkette sein."
            );
        }
        else if (!validator.isLength(company.taxNumber, { max: 50 })) {
            addError(
                errors,
                "taxNumber",
                "Steuernummer darf nicht länger als 50 Zeichen sein."
            );
        }
    }

    // street
    if (company.street !== null) {
        if (typeof company.street !== "string") {
            addError(
                errors,
                "street",
                "Straße muss eine Zeichenkette sein."
            );
        }
        else if (!validator.isLength(company.street, { max: 150 })) {
            addError(
                errors,
                "street",
                "Straße darf nicht länger als 150 Zeichen sein."
            );
        }
    }

    // city
    if (company.city !== null) {
        if (typeof company.city !== "string") {
            addError(
                errors,
                "city",
                "Ort muss eine Zeichenkette sein."
            );
        }
        else if (!validator.isLength(company.city, { max: 100 })) {
            addError(
                errors,
                "city",
                "Ort darf nicht länger als 100 Zeichen sein."
            );
        }
    }

    // postalCode
    if (company.postalCode !== null) {
        if (typeof company.postalCode !== "string") {
            addError(
                errors,
                "postalCode",
                "Postleitzahl muss eine Zeichenkette sein."
            );
        }
        else if (!validator.isLength(company.postalCode, { max: 20 })) {
            addError(
                errors,
                "postalCode",
                "Postleitzahl darf nicht länger als 20 Zeichen sein."
            );
        }
    }

    // countryCode
    if (company.countryCode !== null) {
        if (typeof company.countryCode !== "string") {
            addError(
                errors,
                "countryCode",
                "Ländercode muss eine Zeichenkette sein."
            );
        }
        else {
            company.countryCode = company.countryCode.toUpperCase();

            if (!validator.isLength(company.countryCode, { min: 2, max: 2 })) {
                addError(
                    errors,
                    "countryCode",
                    "Ländercode muss genau 2 Zeichen lang sein."
                );
            }
            else if (!validator.isISO31661Alpha2(company.countryCode)) {
                addError(
                    errors,
                    "countryCode",
                    "Ungültiger Ländercode."
                );
            }
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            errors,
        });
    }

    req.company = company;

    next();
};
