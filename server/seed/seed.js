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

function roundMoney(value){
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

function randomInt(min, max){
    return Math.floor(random() * (max - min + 1)) + min;
}

function randomChoice(array){
    return array[randomInt(0, array.length - 1)];
}


// Deterministic pseudo-random generator.
// This gives us random-looking data while keeping every seed run reproducible.
let randomState = 20260911;

function random(){
    randomState |= 0;
    randomState = randomState + 0x6D2B79F5 | 0;

    let t = Math.imul(
        randomState ^ randomState >>> 15,
        1 | randomState
    );

    t = t + Math.imul(
        t ^ t >>> 7,
        61 | t
    ) ^ t;

    return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

function addDays(date, days){
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function createInvoiceId(number){
    return new ObjectId(
        String(number).padStart(24, "0")
    );
}

function createPayment({
    paymentStatus,
    totalGross,
    invoiceDate,
}){
    let paidAmount = 0;
    let payments = [];

    if(paymentStatus === "paid"){
        paidAmount = totalGross;

        payments = [
            {
                amount: totalGross,
                method: "bank_transfer",
                paidAt: addDays(invoiceDate, randomInt(1, 10)),
                note: "",
            }
        ];
    }

    if(paymentStatus === "partially_paid"){
        paidAmount = roundMoney(
            totalGross * randomChoice([
                0.25,
                0.30,
                0.40,
                0.50,
                0.60,
                0.75,
            ])
        );

        payments = [
            {
                amount: paidAmount,
                method: randomChoice([
                    "bank_transfer",
                    "cash",
                ]),
                paidAt: addDays(invoiceDate, randomInt(1, 15)),
                note: "",
            }
        ];
    }

    const openAmount = roundMoney(
        Math.max(0, totalGross - paidAmount)
    );

    return {
        method: randomChoice([
            "bank_transfer",
            "bank_transfer",
            "cash",
        ]),

        paidAmount,

        openAmount,

        status: paymentStatus,

        payments,
    };
}

// -----------------------------------------------------------------------------
// Invoice Items
// -----------------------------------------------------------------------------

const itemTemplates = [
    {
        title: "Dacharbeiten",
        descriptions: [
            "Reparatur und Instandsetzung des Daches",
            "Ausführung von Dacharbeiten",
            "Wartung und Reparatur der Dachfläche",
            "Austausch beschädigter Dachelemente",
        ],
        units: ["Stück", "Std.", "m²"],
        priceMin: 45,
        priceMax: 180,
    },
    {
        title: "Dachziegel",
        descriptions: [
            "Lieferung und Verlegung von Dachziegeln",
            "Austausch beschädigter Dachziegel",
            "Lieferung von hochwertigen Dachziegeln",
        ],
        units: ["Stück"],
        priceMin: 3,
        priceMax: 15,
    },
    {
        title: "Elektroinstallation",
        descriptions: [
            "Installation und Prüfung elektrischer Leitungen",
            "Erweiterung der bestehenden Elektroinstallation",
            "Montage und Anschluss elektrischer Komponenten",
        ],
        units: ["Std.", "Stück"],
        priceMin: 65,
        priceMax: 140,
    },
    {
        title: "Elektromaterial",
        descriptions: [
            "Lieferung von Installationsmaterial",
            "Material für die Elektroinstallation",
            "Lieferung und Bereitstellung von Elektromaterial",
        ],
        units: ["Stück", "Pauschal"],
        priceMin: 8,
        priceMax: 250,
    },
    {
        title: "Montagearbeiten",
        descriptions: [
            "Montage und fachgerechte Installation",
            "Montagearbeiten vor Ort",
            "Demontage und anschließende Montage",
        ],
        units: ["Std.", "Stück"],
        priceMin: 50,
        priceMax: 120,
    },
    {
        title: "Arbeitszeit",
        descriptions: [
            "Facharbeiterstunden",
            "Arbeitszeit für die Durchführung der Arbeiten",
            "Arbeitsleistung vor Ort",
        ],
        units: ["Std."],
        priceMin: 55,
        priceMax: 95,
    },
    {
        title: "Materiallieferung",
        descriptions: [
            "Lieferung und Bereitstellung des benötigten Materials",
            "Materiallieferung zur Baustelle",
            "Transport und Lieferung von Baumaterial",
        ],
        units: ["Pauschal"],
        priceMin: 35,
        priceMax: 180,
    },
    {
        title: "Wartung",
        descriptions: [
            "Wartung und Funktionsprüfung",
            "Regelmäßige Wartungsarbeiten",
            "Inspektion und Wartung der Anlage",
        ],
        units: ["Std.", "Pauschal"],
        priceMin: 60,
        priceMax: 160,
    },
    {
        title: "Reinigung",
        descriptions: [
            "Baustellenreinigung nach Abschluss der Arbeiten",
            "Fachgerechte Reinigung der Arbeitsbereiche",
            "Endreinigung der Baustelle",
        ],
        units: ["Std.", "Pauschal"],
        priceMin: 35,
        priceMax: 120,
    },
    {
        title: "Anfahrt",
        descriptions: [
            "Anfahrt zur Baustelle",
            "An- und Abfahrt zum Einsatzort",
            "Fahrtkosten",
        ],
        units: ["Pauschal"],
        priceMin: 20,
        priceMax: 90,
    },
];

function createInvoiceItem(){
    const template = randomChoice(itemTemplates);

    const unit = randomChoice(template.units);

    let quantity;

    if(unit === "Std."){
        quantity = randomChoice([
            1,
            2,
            3,
            4,
            5,
            6,
            8,
            10,
            12,
            16,
        ]);
    }
    else if(unit === "m²"){
        quantity = randomInt(5, 120);
    }
    else if(unit === "Stück"){
        quantity = randomInt(1, 25);
    }
    else{
        quantity = 1;
    }

    const rawPrice = randomInt(
        template.priceMin * 100,
        template.priceMax * 100
    );

    const unitPrice = roundMoney(rawPrice / 100);

    const taxRate = randomChoice([
        19,
        19,
        19,
        7,
    ]);

    const discountType = randomChoice([
        "none",
        "none",
        "none",
        "percentage",
        "fixed",
    ]);

    let discountValue = 0;

    if(discountType === "percentage"){
        discountValue = randomChoice([
            5,
            10,
            15,
        ]);
    }

    if(discountType === "fixed"){
        discountValue = randomChoice([
            5,
            10,
            15,
            20,
            25,
            30,
        ]);
    }

    return {
        title: template.title,

        description: randomChoice(
            template.descriptions
        ),

        quantity,

        unit,

        unitPrice,

        taxRate,

        discountType,

        discountValue,
    };
}

function calculateItemTotals(item){
    const grossItemNet = roundMoney(
        item.quantity * item.unitPrice
    );

    let discountNet = 0;

    if(item.discountType === "percentage"){
        discountNet = roundMoney(
            grossItemNet * item.discountValue / 100
        );
    }

    if(item.discountType === "fixed"){
        discountNet = roundMoney(
            Math.min(
                grossItemNet,
                item.discountValue
            )
        );
    }

    const totalNet = roundMoney(
        grossItemNet - discountNet
    );

    const totalTax = roundMoney(
        totalNet * item.taxRate / 100
    );

    const totalGross = roundMoney(
        totalNet + totalTax
    );

    return {
        subtotalNet: grossItemNet,
        discountNet,
        totalNet,
        totalTax,
        totalGross,
    };
}

function calculateInvoiceTotals(items){
    const totals = {
        subtotalNet: 0,
        discountNet: 0,
        totalNet: 0,
        totalTax: 0,
        totalGross: 0,
    };

    items.forEach(item => {
        const itemTotals = calculateItemTotals(item);

        totals.subtotalNet += itemTotals.subtotalNet;
        totals.discountNet += itemTotals.discountNet;
        totals.totalNet += itemTotals.totalNet;
        totals.totalTax += itemTotals.totalTax;
        totals.totalGross += itemTotals.totalGross;
    });

    totals.subtotalNet = roundMoney(
        totals.subtotalNet
    );

    totals.discountNet = roundMoney(
        totals.discountNet
    );

    totals.totalNet = roundMoney(
        totals.totalNet
    );

    totals.totalTax = roundMoney(
        totals.totalTax
    );

    totals.totalGross = roundMoney(
        totals.totalGross
    );

    return totals;
}

function createInvoiceItems(){
    const itemCount = randomInt(1, 6);

    const items = [];

    for(let i = 0; i < itemCount; i++){
        items.push(createInvoiceItem());
    }

    return items;
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

const passwordHash = bcrypt.hashSync(
    plainPassword,
    SALT_ROUNDS
);

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

    createdAt: new Date(
        "2026-06-23T07:30:26.172Z"
    ),
});

// -----------------------------------------------------------------------------
// Settings
// -----------------------------------------------------------------------------

upsert("settings", { userId }, {
    userId,

    company: {
        companyName: "Mustermann Handwerk GmbH",

        ownerName: "Thomas Mustermann",

        email: "info@mustermann-handwerk.de",

        phone: "+49 271 1234567",

        website: "https://www.mustermann-handwerk.de",

        street: "Musterstraße 12",

        postalCode: "57072",

        city: "Siegen",

        countryCode: "DE",

        logo: null,

        greeting: "Mit freundlichen Grüßen",

        bank: {
            bankName: "Musterbank",

            iban: "DE89370400440532013000",

            bic: "COBADEFFXXX",
        },

        vatId: "DE123456789",

        taxNumber: "342/5678/9012",
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
        invoicePrefix: "RE",

        invoiceNumberFormat:
            "{prefix}{year}-{number}",

        nextInvoiceNumber: 1,

        paymentTermsDays: 14,

        currency: "EUR",

        language: "de",

        introduction:
            "Vielen Dank für Ihren Auftrag.",

        closing:
            "Vielen Dank für Ihr Vertrauen.\nFür Rückfragen stehen wir Ihnen gerne zur Verfügung.",

        showItemNumbers: true,

        showTaxRatePerItem: false,

        taxRate: 19,
    },

    tax: {
        vatMode: "standard",

        defaultVatRate: 19,

        reducedVatRate: 7,

        taxCountryCode: "DE",

        reverseChargeEnabled: false,
    },

    offer: {
        offerPrefix: "",

        offerNumberFormat:
            "{prefix}{year}-{number}",

        nextOfferNumber: 1,

        validityDays: 14,

        introduction:
            "Vielen Dank für Ihre Anfrage.\nGerne unterbreiten wir Ihnen folgendes Angebot.",

        closing:
            "Wir freuen uns auf Ihren Auftrag.\nFür Rückfragen stehen wir Ihnen jederzeit gerne zur Verfügung.",

        showItemNumbers: true,

        showTaxRatePerItem: false,

        taxRate: 19,
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

            bankName: "Deutsche Kreditbank",
        },
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

            bankName: "Volksbank Köln Bonn",
        },
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

            bankName: "Commerzbank",
        },
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

            bankName: "ING",
        },
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

            bankName: "ING",
        },
    },
];

customers.forEach(customer => {
    upsert(
        "customers",
        { _id: customer._id },
        customer
    );
});

// -----------------------------------------------------------------------------
// Invoice Factory
// -----------------------------------------------------------------------------

function createInvoice({
    _id,
    number,
    customer,
    status,
    paymentStatus,
    invoiceDate,
}){
    const customerSnapshot =
        createInvoiceCustomer(customer);

    const items = createInvoiceItems();

    const totals = calculateInvoiceTotals(items);

    const payment = createPayment({
        paymentStatus,
        totalGross: totals.totalGross,
        invoiceDate,
    });

    const paymentTermsDays = randomChoice([
        7,
        10,
        14,
        14,
        21,
        30,
    ]);

    const dueDate = addDays(
        invoiceDate,
        paymentTermsDays
    );

    const createdAt = new Date(
        invoiceDate.getTime()
    );

    createdAt.setDate(
        createdAt.getDate() - randomInt(0, 3)
    );

    const updatedAt = new Date(
        Math.max(
            createdAt.getTime(),
            dueDate.getTime() - randomInt(0, 3) * 86400000
        )
    );

    return {
        _id,

        userId,

        type: "invoice",

        invoiceNumber: number,

        status,

        customerId: customer._id,

        customer: customerSnapshot,

        seller: {
            companyName:
                "Mustermann Handwerk GmbH",

            ownerName:
                "Thomas Mustermann",

            street:
                "Musterstraße 12",

            postalCode:
                "57072",

            city:
                "Siegen",

            countryCode:
                "DE",

            email:
                "info@mustermann-handwerk.de",

            phone:
                "+49 271 1234567",

            vatId:
                "DE123456789",
        },

        invoiceDate,

        dueDate,

        currency: "EUR",

        items,

        note: randomChoice([
            "",
            "",
            "",
            "Bitte beachten Sie die Zahlungsfrist.",
            "Vielen Dank für die angenehme Zusammenarbeit.",
            "Bei Rückfragen stehen wir Ihnen gerne zur Verfügung.",
        ]),

        payment,

        totals,

        createdAt,

        updatedAt,
    };
}

// -----------------------------------------------------------------------------
// Invoice Config
// -----------------------------------------------------------------------------

const invoiceConfigs = [
    {
        number: 1001,
        customer: customers[0],
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-01-05"),
    },

    {
        number: 1002,
        customer: customers[1],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-01-07"),
    },

    {
        number: 1003,
        customer: customers[2],
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-01-10"),
    },

    {
        number: 1004,
        customer: customers[3],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-01-12"),
    },

    {
        number: 1005,
        customer: customers[4],
        status: "sent",
        paymentStatus: "partially_paid",
        invoiceDate: new Date("2026-01-15"),
    },

    {
        number: 1006,
        customer: customers[0],
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-02-01"),
    },

    {
        number: 1007,
        customer: customers[1],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-02-04"),
    },

    {
        number: 1008,
        customer: customers[2],
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-02-08"),
    },

    {
        number: 1009,
        customer: customers[3],
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-02-10"),
    },

    {
        number: 1010,
        customer: customers[4],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-02-14"),
    },

    {
        number: 1011,
        customer: customers[0],
        status: "sent",
        paymentStatus: "partially_paid",
        invoiceDate: new Date("2026-02-20"),
    },

    {
        number: 1012,
        customer: customers[1],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-02-24"),
    },

    {
        number: 1013,
        customer: customers[2],
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-03-02"),
    },

    {
        number: 1014,
        customer: customers[3],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-03-05"),
    },

    {
        number: 1015,
        customer: customers[4],
        status: "sent",
        paymentStatus: "partially_paid",
        invoiceDate: new Date("2026-03-11"),
    },

    {
        number: 1016,
        customer: customers[0],
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-03-18"),
    },

    {
        number: 1017,
        customer: customers[1],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-03-22"),
    },

    {
        number: 1018,
        customer: customers[2],
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-04-01"),
    },

    {
        number: 1019,
        customer: customers[3],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-04-07"),
    },

    {
        number: 1020,
        customer: customers[4],
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-04-14"),
    },

    {
        number: 1021,
        customer: customers[0],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-04-21"),
    },

    {
        number: 1022,
        customer: customers[1],
        status: "sent",
        paymentStatus: "partially_paid",
        invoiceDate: new Date("2026-05-02"),
    },

    {
        number: 1023,
        customer: customers[2],
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-05-09"),
    },

    {
        number: 1024,
        customer: customers[3],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-05-16"),
    },

    {
        number: 1025,
        customer: customers[4],
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-05-25"),
    },

    {
        number: 1026,
        customer: customers[0],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-06-03"),
    },

    {
        number: 1027,
        customer: customers[1],
        status: "sent",
        paymentStatus: "partially_paid",
        invoiceDate: new Date("2026-06-11"),
    },

    {
        number: 1028,
        customer: customers[2],
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-06-18"),
    },

    {
        number: 1029,
        customer: customers[3],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-07-02"),
    },

    {
        number: 1030,
        customer: customers[4],
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-07-10"),
    },

    {
        number: 1031,
        customer: customers[0],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-07-18"),
    },

    {
        number: 1032,
        customer: customers[1],
        status: "sent",
        paymentStatus: "partially_paid",
        invoiceDate: new Date("2026-07-25"),
    },

    {
        number: 1033,
        customer: customers[2],
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-08-01"),
    },

    {
        number: 1034,
        customer: customers[3],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-08-08"),
    },

    {
        number: 1035,
        customer: customers[4],
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-08-15"),
    },

    {
        number: 1036,
        customer: customers[0],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-08-22"),
    },

    {
        number: 1037,
        customer: customers[1],
        status: "sent",
        paymentStatus: "partially_paid",
        invoiceDate: new Date("2026-08-27"),
    },

    {
        number: 1038,
        customer: customers[2],
        status: "sent",
        paymentStatus: "paid",
        invoiceDate: new Date("2026-09-01"),
    },

    {
        number: 1039,
        customer: customers[3],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-09-03"),
    },

    {
        number: 1040,
        customer: customers[4],
        status: "sent",
        paymentStatus: "open",
        invoiceDate: new Date("2026-09-05"),
    },
];

// -----------------------------------------------------------------------------
// Create Invoices
// -----------------------------------------------------------------------------

invoiceConfigs.forEach(cfg => {
    const invoice = createInvoice({
        _id: createInvoiceId(cfg.number),

        number: cfg.number,

        customer: cfg.customer,

        status: cfg.status,

        paymentStatus: cfg.paymentStatus,

        invoiceDate: cfg.invoiceDate,
    });

    upsert(
        "invoices",
        { _id: invoice._id },
        invoice
    );
});

// -----------------------------------------------------------------------------
// Done
// -----------------------------------------------------------------------------

print("");
print("Seed completed (idempotent mode).");
print("");
print(`User ID: ${userId}`);
print(`Customers: ${customers.length}`);
print(`Invoices: ${invoiceConfigs.length}`);
print("");
