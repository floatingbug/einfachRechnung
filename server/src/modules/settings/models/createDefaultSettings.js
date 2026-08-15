const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId}) => {
    const db = getDb();
    const doc = {
        userId: new ObjectId(userId),
        company: {
            companyName: "",
            ownerName: "",

            email: "",
            phone: "",
            website: "",

            street: "",
            postalCode: "",
            city: "",
            countryCode: "",

            logo: null,

            greeting: "Mit freundlichen Grüßen",
        },
        email: {
            senderName: "",
            replyTo: "",

            offerSubject: "Ihr Angebot",
            offerMessage: "",

            invoiceSubject: "Ihre Rechnung",
            invoiceMessage: "",

            autoSendEnabled: false,
        },
        invoice: {
            invoicePrefix: "",
            invoiceNumberFormat: "{prefix}{year}-{number}",

            nextInvoiceNumber: 1,

            defaultPaymentTermsDays: 14,

            currency: "EUR",
            language: "de",

            defaultIntroduction:
                "Vielen Dank für Ihren Auftrag.",

            defaultClosing:
                "Vielen Dank für Ihr Vertrauen.\nFür Rückfragen stehen wir Ihnen gerne zur Verfügung.",

            showItemNumbers: true,
            showTaxRatePerItem: false,
        },
        tax: {
            vatId: "",
            taxNumber: "",

            defaultTaxRate: 19,

            isSmallBusiness: false,
        },
        offer: {
            offerPrefix: "",
            offerNumberFormat: "{prefix}{year}-{number}",

            nextOfferNumber: 1,

            defaultValidityDays: 14,

            defaultIntroduction:
                "Vielen Dank für Ihre Anfrage.\nGerne unterbreiten wir Ihnen folgendes Angebot.",

            defaultClosing:
                "Wir freuen uns auf Ihren Auftrag.\nFür Rückfragen stehen wir Ihnen jederzeit gerne zur Verfügung.",

            showItemNumbers: true,
            showTaxRatePerItem: false,

            taxRate: 19,
        },
    };

    const result = await db.collection("settings")
        .insertOne(doc);

    return result;
};
