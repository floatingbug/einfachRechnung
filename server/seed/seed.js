// seed.js
// Run with:
// mongosh "mongodb://localhost:27017/einfachRechnung" seed.js

const bcrypt = require("bcrypt");

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function upsert(collection, filter, doc){
    return db[collection].updateOne(
        filter,
        { $set: doc },
        { upsert: true }
    );
}

function createInvoiceCustomer(customer){
    return {
        customerType: customer.customerType ?? "",

        companyName: customer.companyName ?? "",
        contactPerson: customer.contactPerson ?? "",

        firstName: customer.firstName ?? "",
        lastName: customer.lastName ?? "",

        street: customer.street ?? "",
        postalCode: customer.postalCode ?? "",
        city: customer.city ?? "",
        countryCode: customer.countryCode ?? "",

        phone: customer.phone ?? "",
        email: customer.email ?? "",
        vatId: customer.vatId ?? "",
    };
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const userId = new ObjectId("64b7f0c2a1d3e4f567890123");
const SALT_ROUNDS = 10;

const customerIds = [
    new ObjectId("64b7f0c2a1d3e4f567890201"),
    new ObjectId("64b7f0c2a1d3e4f567890202"),
    new ObjectId("64b7f0c2a1d3e4f567890203"),
    new ObjectId("64b7f0c2a1d3e4f567890204"),
    new ObjectId("64b7f0c2a1d3e4f567890205"),
];

// -----------------------------------------------------------------------------
// Cleanup (idempotent reset for this user)
// -----------------------------------------------------------------------------

db.users.deleteOne({ _id: userId });
db.settings.deleteOne({ userId });
db.customers.deleteMany({ userId });
db.invoices.deleteMany({ userId });

// -----------------------------------------------------------------------------
// User
// -----------------------------------------------------------------------------

const plainPassword = "123";

const passwordHash = bcrypt.hashSync(plainPassword, SALT_ROUNDS);

upsert("users", { _id: userId }, {
    _id: userId,
    name: "user1",
    email: "user@user.com",
    pendingEmail: null,
    pendingEmailToken: null,
    pendingEmailExpiresAt: null,

    password: passwordHash,

    emailVerified: true,
    emailTokenHash: null,
    emailTokenExpiresAt: null,
    createdAt: new Date("2026-06-23T07:30:26.172Z")
});

// -----------------------------------------------------------------------------
// Settings
// -----------------------------------------------------------------------------

upsert("settings", { userId }, {
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

const customers = [
    {
        _id: customerIds[0],
        userId,
        customerNumber: "K-1",
        companyName: "Muster GmbH",
        contactPerson: "Bob Heinrich",
        street: "Hauptstraße 12",
        postalCode: "10115",
        city: "Berlin",
        countryCode: "DE",
        phone: "+49301234567",
        email: "info@muster-gmbh.de",
        vatId: "DE123456789",
        customerType: "company",
        bank: {
            iban: "DE02120300000000202051",
            bic: "BYLADEM1001",
            bankName: "Deutsche Kreditbank"
        }
    },
    {
        _id: customerIds[1],
        userId,
        customerNumber: "K-2",
        firstName: "Andrey",
        lastName: "Schmidt",
        salutation: "male",
        street: "Bahnhofstraße 8",
        postalCode: "50667",
        city: "Köln",
        countryCode: "DE",
        phone: "+49221123456",
        email: "kontakt@schmidt-handwerk.de",
        customerType: "private",
        bank: {
            iban: "DE75512108001245126199",
            bic: "GENODEF1S01",
            bankName: "Volksbank Köln Bonn"
        }
    },
    {
        _id: customerIds[2],
        userId,
        customerNumber: "K-3",
        companyName: "Meyer Consulting",
        contactPerson: "Hanz Meyer",
        street: "Am Markt 3",
        postalCode: "20095",
        city: "Hamburg",
        countryCode: "DE",
        phone: "+49401234567",
        email: "mail@meyer-consulting.de",
        vatId: "DE345678901",
        customerType: "company",
        bank: {
            iban: "DE89370400440532013000",
            bic: "COBADEFFXXX",
            bankName: "Commerzbank"
        }
    },
    {
        _id: customerIds[3],
        userId,
        customerNumber: "K-4",
        companyName: "Elektro Wagner",
        contactPerson: "Dieter Balboa",
        street: "Industriestraße 22",
        postalCode: "90402",
        city: "Nürnberg",
        countryCode: "DE",
        phone: "+49911234567",
        email: "service@elektro-wagner.de",
        vatId: "DE456789012",
        customerType: "company",
        bank: {
            iban: "DE12500105170648489890",
            bic: "INGDDEFFXXX",
            bankName: "ING"
        }
    },
    {
        _id: customerIds[4],
        userId,
        customerNumber: "K-5",
        firstName: "Konrad",
        lastName: "Hoffmann",
        street: "Kirchplatz 5",
        postalCode: "01067",
        city: "Dresden",
        countryCode: "DE",
        phone: "+49351123456",
        email: "info@baeckerei-hoffmann.de",
        customerType: "private",
        bank: {
            iban: "DE44500105175407324931",
            bic: "INGDDEFFXXX",
            bankName: "ING"
        }
    },
];

customers.forEach(c => {
    upsert("customers", { _id: c._id }, c);
});

// -----------------------------------------------------------------------------
// Invoice Factory
// -----------------------------------------------------------------------------

function createInvoice({
    _id,
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
    else if (paymentStatus === "partially_paid"){
        paidAmount = Number((grossTotal / 2).toFixed(2));
    }

    const openAmount = Number((grossTotal - paidAmount).toFixed(2));

    return {
        _id,

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

        customer: createInvoiceCustomer(customer),

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

        payments: paymentStatus === "paid"
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
// Invoices (idempotent)
// -----------------------------------------------------------------------------

const invoiceConfigs = [
    {
        number: 1001,
        customer: customers[0],
        netTotal: 500,
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-01-05")
    },
    {
        number: 1002,
        customer: customers[1],
        netTotal: 850,
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-01-07")
    },
    {
        number: 1003,
        customer: customers[2],
        netTotal: 1200,
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-01-10")
    },
    {
        number: 1004,
        customer: customers[3],
        netTotal: 350,
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-01-12")
    },
    {
        number: 1005,
        customer: customers[4],
        netTotal: 650,
        status: "sent",
        paymentStatus: "partially_paid",
        invoiceDate: new Date("2026-01-15")
    },
    {
        number: 1006,
        customer: customers[0],
        netTotal: 950,
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-02-01")
    },
    {
        number: 1007,
        customer: customers[1],
        netTotal: 780,
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-02-04")
    },
    {
        number: 1008,
        customer: customers[2],
        netTotal: 430,
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-02-08")
    },
    {
        number: 1009,
        customer: customers[3],
        netTotal: 1100,
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-02-10")
    },
    {
        number: 1010,
        customer: customers[4],
        netTotal: 720,
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-02-14")
    },
];

invoiceConfigs.forEach(cfg => {
    const invoiceId = new ObjectId(
        String(cfg.number).padStart(24, "0")
    );

    const invoice = createInvoice({
        _id: invoiceId,
        ...cfg,
    });

    upsert("invoices", { _id: invoice._id }, invoice);
});

// -----------------------------------------------------------------------------
// Done
// -----------------------------------------------------------------------------

print("Seed completed (idempotent mode).");
print(`User ID: ${userId}`);
print(`Customers: ${customers.length}`);
print(`Invoices: ${invoiceConfigs.length}`);
