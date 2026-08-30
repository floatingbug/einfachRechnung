const PDFDocument = require("pdfkit");


// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

const PAGE = {
    width: 595.28,
    height: 841.89,

    left: 50,
    right: 50,
    top: 45,
    bottom: 50,
};

const CONTENT = {
    x: PAGE.left,

    width:
        PAGE.width -
        PAGE.left -
        PAGE.right,

    right:
        PAGE.width -
        PAGE.right,
};

const SPACING = {
    section: 28,

    headingToContent: 8,

    sellerToDivider: 12,

    invoiceHeaderToCustomer: 28,

    customerToItems: 30,

    itemsHeaderToFirstRow: 9,

    itemAfterRow: 7,

    itemsToTotals: 28,

    totalRow: 16,

    totalsToTaxInformation: 28,

    taxInformationToPayment: 28,

    paymentHeadingToContent: 8,

    paymentToLegal: 20,
};

const COLORS = {
    text: "#000000",
    muted: "#666666",
    lightLine: "#D0D0D0",
};


// -----------------------------------------------------------------------------
// Entry
// -----------------------------------------------------------------------------

module.exports = async ({invoice}) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            size: "A4",

            margins: {
                top: PAGE.top,
                right: PAGE.right,
                bottom: PAGE.bottom,
                left: PAGE.left,
            },

            /*
             * Alle Seiten werden zunächst im Speicher gehalten.
             *
             * Dadurch können wir nach dem Rendern:
             *
             * 1. eine eventuell von PDFKit erzeugte leere letzte Seite
             *    entfernen
             * 2. danach die korrekten Seitenzahlen schreiben
             */
            bufferPages: true,
        });

        // ---------------------------------------------------------------------
        // Seiten-Tracking
        // ---------------------------------------------------------------------

        let currentPageIndex = 0;

        const pageHasContent = {
            0: false,
        };

        doc.on("pageAdded", () => {
            currentPageIndex += 1;

            pageHasContent[currentPageIndex] = false;
        });

        /*
         * PDFKit kann intern während doc.text() eine neue Seite erzeugen.
         *
         * Deshalb markieren wir jede Seite, auf der tatsächlich Text
         * geschrieben wurde.
         *
         * Wichtig:
         *
         * Die Seitennummern werden erst NACH dem Entfernen leerer Seiten
         * geschrieben.
         */
        const originalText =
            doc.text.bind(doc);

        doc.text = function trackedText(...args) {
            pageHasContent[currentPageIndex] = true;

            return originalText(...args);
        };

        // ---------------------------------------------------------------------
        // PDF Buffer
        // ---------------------------------------------------------------------

        const chunks = [];

        doc.on("data", (chunk) => {
            chunks.push(chunk);
        });

        doc.on("end", () => {
            resolve(
                Buffer.concat(chunks),
            );
        });

        doc.on("error", reject);

        try {
            renderInvoice(
                doc,
                invoice,
            );

            /*
             * Erst jetzt eventuell erzeugte leere letzte Seiten entfernen.
             *
             * Danach werden die Seitennummern geschrieben.
             */
            removeTrailingBlankPages(
                doc,
                pageHasContent,
            );

            renderPageNumbers(
                doc,
            );

            doc.end();
        }
        catch(error) {
            reject(error);
        }
    });
};


// -----------------------------------------------------------------------------
// Invoice
// -----------------------------------------------------------------------------

function renderInvoice(doc, invoice) {
    renderSellerHeader(
        doc,
        invoice.seller,
    );

    renderInvoiceHeader(
        doc,
        invoice,
    );

    renderCustomer(
        doc,
        invoice.customer,
    );

    renderItems(
        doc,
        invoice,
    );

    renderTotals(
        doc,
        invoice,
    );

    renderTaxInformation(
        doc,
        invoice,
    );

    renderPaymentInformation(
        doc,
        invoice,
    );

    renderSellerLegalInformation(
        doc,
        invoice.seller,
    );
}


// -----------------------------------------------------------------------------
// Platzberechnung
// -----------------------------------------------------------------------------

function remainingHeight(doc) {
    return (
        doc.page.height -
        doc.page.margins.bottom -
        doc.y
    );
}


function ensureSpace(doc, neededHeight) {
    if(
        remainingHeight(doc) <
        neededHeight
    ){
        doc.addPage();
    }
}


// -----------------------------------------------------------------------------
// Seller header
// -----------------------------------------------------------------------------

function renderSellerHeader(doc, seller) {
    if(!seller){
        return;
    }

    doc
        .font("Helvetica-Bold")
        .fontSize(18)
        .fillColor(COLORS.text);

    doc.text(
        seller.companyName || "",
        CONTENT.x,
        doc.y,
        {
            width: CONTENT.width,
            lineBreak: false,
            ellipsis: true,
        },
    );

    if(seller.ownerName){
        doc
            .moveDown(0.15)
            .font("Helvetica")
            .fontSize(9);

        doc.text(
            seller.ownerName,
            CONTENT.x,
            doc.y,
            {
                width: CONTENT.width,
                lineBreak: false,
                ellipsis: true,
            },
        );
    }

    doc
        .moveDown(0.3)
        .font("Helvetica")
        .fontSize(9);

    if(seller.street){
        doc.text(
            seller.street,
            CONTENT.x,
            doc.y,
            {
                width: CONTENT.width,
                lineBreak: false,
                ellipsis: true,
            },
        );
    }

    const address = [
        seller.postalCode,
        seller.city,
    ]
        .filter(Boolean)
        .join(" ");

    if(address){
        doc.text(
            address,
            CONTENT.x,
            doc.y,
            {
                width: CONTENT.width,
                lineBreak: false,
                ellipsis: true,
            },
        );
    }

    if(seller.countryCode){
        doc.text(
            getCountryName(
                seller.countryCode,
            ),
            CONTENT.x,
            doc.y,
            {
                width: CONTENT.width,
                lineBreak: false,
                ellipsis: true,
            },
        );
    }

    if(seller.email){
        doc.text(
            seller.email,
            CONTENT.x,
            doc.y,
            {
                width: CONTENT.width,
                lineBreak: false,
                ellipsis: true,
            },
        );
    }

    if(seller.phone){
        doc.text(
            seller.phone,
            CONTENT.x,
            doc.y,
            {
                width: CONTENT.width,
                lineBreak: false,
                ellipsis: true,
            },
        );
    }

    doc.moveDown(
        SPACING.sellerToDivider / 12,
    );

    drawLine(doc);
}


// -----------------------------------------------------------------------------
// Invoice header
// -----------------------------------------------------------------------------

function renderInvoiceHeader(doc, invoice) {
    doc.moveDown(1.5);

    doc
        .font("Helvetica-Bold")
        .fontSize(24)
        .fillColor(COLORS.text);

    doc.text(
        "RECHNUNG",
        CONTENT.x,
        doc.y,
        {
            width: CONTENT.width,
            lineBreak: false,
        },
    );

    doc.moveDown(0.65);

    const rows = [];

    if(invoice.invoiceNumber){
        rows.push([
            "Rechnungsnummer",
            invoice.invoiceNumber,
        ]);
    }

    if(invoice.invoiceDate){
        rows.push([
            "Rechnungsdatum",
            formatDate(invoice.invoiceDate),
        ]);
    }

    if(invoice.serviceDate){
        rows.push([
            "Leistungsdatum",
            formatDate(invoice.serviceDate),
        ]);
    }

    if(invoice.dueDate){
        rows.push([
            "Fällig am",
            formatDate(invoice.dueDate),
        ]);
    }

    doc
        .font("Helvetica")
        .fontSize(9);

    rows.forEach(
        ([label, value]) => {
            doc.text(
                `${label}: ${value}`,
                CONTENT.x,
                doc.y,
                {
                    width: CONTENT.width,
                    lineBreak: false,
                    ellipsis: true,
                },
            );

            doc.moveDown(0.1);
        },
    );

    doc.moveDown(
        SPACING.invoiceHeaderToCustomer / 12,
    );
}


// -----------------------------------------------------------------------------
// Customer
// -----------------------------------------------------------------------------

function renderCustomer(doc, customer) {
    if(!customer){
        return;
    }

    doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor(COLORS.text);

    doc.text(
        "Rechnungsempfänger",
        CONTENT.x,
        doc.y,
        {
            width: CONTENT.width,
            lineBreak: false,
        },
    );

    doc.moveDown(
        SPACING.headingToContent / 12,
    );

    doc
        .font("Helvetica")
        .fontSize(9);

    if(customer.customerType === "private"){
        const fullName = [
            customer.firstName,
            customer.lastName,
        ]
            .filter(Boolean)
            .join(" ");

        if(fullName){
            doc.text(
                fullName,
                CONTENT.x,
                doc.y,
                {
                    width: CONTENT.width,
                    lineBreak: false,
                    ellipsis: true,
                },
            );
        }
    }
    else{
        if(customer.companyName){
            doc.text(
                customer.companyName,
                CONTENT.x,
                doc.y,
                {
                    width: CONTENT.width,
                    lineBreak: false,
                    ellipsis: true,
                },
            );
        }

        if(customer.contactPerson){
            doc.text(
                customer.contactPerson,
                CONTENT.x,
                doc.y,
                {
                    width: CONTENT.width,
                    lineBreak: false,
                    ellipsis: true,
                },
            );
        }
    }

    if(customer.street){
        doc.text(
            customer.street,
            CONTENT.x,
            doc.y,
            {
                width: CONTENT.width,
                lineBreak: false,
                ellipsis: true,
            },
        );
    }

    const address = [
        customer.postalCode,
        customer.city,
    ]
        .filter(Boolean)
        .join(" ");

    if(address){
        doc.text(
            address,
            CONTENT.x,
            doc.y,
            {
                width: CONTENT.width,
                lineBreak: false,
                ellipsis: true,
            },
        );
    }

    if(customer.countryCode){
        doc.text(
            getCountryName(
                customer.countryCode,
            ),
            CONTENT.x,
            doc.y,
            {
                width: CONTENT.width,
                lineBreak: false,
                ellipsis: true,
            },
        );
    }

    doc.moveDown(
        SPACING.customerToItems / 12,
    );
}


// -----------------------------------------------------------------------------
// Items
// -----------------------------------------------------------------------------

function renderItems(doc, invoice) {
    const items =
        Array.isArray(invoice.items)
            ? invoice.items
            : [];

    if(items.length === 0){
        return;
    }

    const showTaxRate =
        invoice.taxTreatment !== "reverse_charge";

    const columns =
        getItemColumns({
            showTaxRate,
        });

    renderItemHeader(
        doc,
        columns,
    );

    items.forEach(
        (item, index) => {
            const rowHeight =
                calculateItemRowHeight(
                    doc,
                    item,
                    columns,
                    invoice.currency,
                );

            /*
             * Tabellenzeilen werden niemals halb auf eine Seite
             * geschrieben.
             *
             * Ist nicht genug Platz vorhanden, beginnt die komplette
             * Zeile auf der nächsten Seite.
             */
            if(
                remainingHeight(doc) <
                rowHeight
            ){
                doc.addPage();

                renderItemHeader(
                    doc,
                    columns,
                );
            }

            renderItem(
                doc,
                item,
                index + 1,
                columns,
                invoice.currency,
            );
        },
    );
}


function calculateItemRowHeight(
    doc,
    item,
    columns,
    currency,
) {
    const title =
        item.title || "";

    const description =
        item.description
            ? `${title}\n${item.description}`
            : title;

    const discount =
        getDiscountText(
            item,
            currency,
        );

    const fullDescription =
        discount
            ? `${description}\n${discount}`
            : description;

    doc
        .font("Helvetica")
        .fontSize(8);

    const descriptionHeight =
        doc.heightOfString(
            fullDescription,
            {
                width:
                    columns.description.width,
            },
        );

    const rowHeight =
        Math.max(
            descriptionHeight,
            14,
        ) + 10;

    return (
        rowHeight +
        1 +
        SPACING.itemAfterRow
    );
}


// -----------------------------------------------------------------------------
// Item columns
// -----------------------------------------------------------------------------

function getItemColumns({showTaxRate}) {
    if(showTaxRate){
        return {
            number: {
                x: 50,
                width: 25,
            },

            description: {
                x: 80,
                width: 185,
            },

            quantity: {
                x: 270,
                width: 45,
            },

            unit: {
                x: 320,
                width: 55,
            },

            unitPrice: {
                x: 380,
                width: 65,
            },

            taxRate: {
                x: 450,
                width: 35,
            },

            total: {
                x: 490,
                width: 55,
            },
        };
    }

    return {
        number: {
            x: 50,
            width: 25,
        },

        description: {
            x: 80,
            width: 250,
        },

        quantity: {
            x: 335,
            width: 45,
        },

        unit: {
            x: 385,
            width: 55,
        },

        unitPrice: {
            x: 445,
            width: 65,
        },

        total: {
            x: 515,
            width: 30,
        },
    };
}


// -----------------------------------------------------------------------------
// Item header
// -----------------------------------------------------------------------------

function renderItemHeader(doc, columns) {
    const y = doc.y;

    doc
        .font("Helvetica-Bold")
        .fontSize(8)
        .fillColor(COLORS.text);

    doc.text(
        "Pos.",
        columns.number.x,
        y,
        {
            width: columns.number.width,
            lineBreak: false,
        },
    );

    doc.text(
        "Beschreibung",
        columns.description.x,
        y,
        {
            width: columns.description.width,
            lineBreak: false,
        },
    );

    doc.text(
        "Menge",
        columns.quantity.x,
        y,
        {
            width: columns.quantity.width,
            align: "right",
            lineBreak: false,
        },
    );

    doc.text(
        "Einzelpreis",
        columns.unitPrice.x,
        y,
        {
            width: columns.unitPrice.width,
            align: "right",
            lineBreak: false,
        },
    );

    doc.text(
        "Einheit",
        columns.unit.x,
        y,
        {
            width: columns.unit.width,
            lineBreak: false,
        },
    );

    if(columns.taxRate){
        doc.text(
            "MwSt.",
            columns.taxRate.x,
            y,
            {
                width: columns.taxRate.width,
                align: "right",
                lineBreak: false,
            },
        );
    }

    doc.text(
        "Gesamt",
        columns.total.x,
        y,
        {
            width: columns.total.width,
            align: "right",
            lineBreak: false,
        },
    );

    doc.y =
        y +
        18;

    drawLine(doc);

    doc.moveDown(
        SPACING.itemsHeaderToFirstRow / 12,
    );
}


// -----------------------------------------------------------------------------
// Item
// -----------------------------------------------------------------------------

function renderItem(
    doc,
    item,
    position,
    columns,
    currency,
) {
    const quantity =
        Number(item.quantity) || 0;

    const unitPrice =
        Number(item.unitPrice) || 0;

    const total =
        calculateItemTotal(item);

    const title =
        item.title || "";

    const description =
        item.description
            ? `${title}\n${item.description}`
            : title;

    const discount =
        getDiscountText(
            item,
            currency,
        );

    const fullDescription =
        discount
            ? `${description}\n${discount}`
            : description;

    doc
        .font("Helvetica")
        .fontSize(8);

    const descriptionHeight =
        doc.heightOfString(
            fullDescription,
            {
                width:
                    columns.description.width,
            },
        );

    const rowHeight =
        Math.max(
            descriptionHeight,
            14,
        ) + 10;

    const y = doc.y;

    doc.text(
        String(position),
        columns.number.x,
        y,
        {
            width: columns.number.width,
            lineBreak: false,
        },
    );

    doc.text(
        fullDescription,
        columns.description.x,
        y,
        {
            width: columns.description.width,
            height: rowHeight,
        },
    );

    doc.text(
        formatQuantity(quantity),
        columns.quantity.x,
        y,
        {
            width: columns.quantity.width,
            align: "right",
            lineBreak: false,
        },
    );

    doc.text(
        getUnitLabel(item.unit),
        columns.unit.x,
        y,
        {
            width: columns.unit.width,
            lineBreak: false,
            ellipsis: true,
        },
    );

    doc.text(
        formatCurrency(
            unitPrice,
            currency,
        ),
        columns.unitPrice.x,
        y,
        {
            width: columns.unitPrice.width,
            align: "right",
            lineBreak: false,
        },
    );

    if(columns.taxRate){
        doc.text(
            `${formatNumber(item.taxRate)} %`,
            columns.taxRate.x,
            y,
            {
                width: columns.taxRate.width,
                align: "right",
                lineBreak: false,
            },
        );
    }

    doc.text(
        formatCurrency(
            total,
            currency,
        ),
        columns.total.x,
        y,
        {
            width: columns.total.width,
            align: "right",
            lineBreak: false,
        },
    );

    doc.y =
        y +
        rowHeight;

    drawLightLine(doc);

    doc.moveDown(
        SPACING.itemAfterRow / 12,
    );
}


// -----------------------------------------------------------------------------
// Totals
// -----------------------------------------------------------------------------

function renderTotals(doc, invoice) {
    const totals =
        invoice.totals || {};

    doc.moveDown(
        SPACING.itemsToTotals / 12,
    );

    const totalAreaX = 320;

    const totalAreaWidth =
        CONTENT.right -
        totalAreaX;

    const labelWidth = 135;

    const valueX =
        totalAreaX +
        labelWidth;

    const valueWidth =
        totalAreaWidth -
        labelWidth;

    if(totals.subtotalNet !== undefined){
        ensureSpace(
            doc,
            SPACING.totalRow,
        );

        renderTotalRow(
            doc,
            "Zwischensumme netto",
            totals.subtotalNet,
            totalAreaX,
            valueX,
            valueWidth,
            invoice.currency,
        );
    }

    if(
        totals.discountNet !== undefined &&
        Number(totals.discountNet) !== 0
    ){
        ensureSpace(
            doc,
            SPACING.totalRow,
        );

        renderTotalRow(
            doc,
            "Rabatt",
            -Math.abs(
                Number(totals.discountNet),
            ),
            totalAreaX,
            valueX,
            valueWidth,
            invoice.currency,
        );
    }

    if(totals.totalNet !== undefined){
        ensureSpace(
            doc,
            SPACING.totalRow + 10,
        );

        doc.moveDown(0.25);

        renderTotalRow(
            doc,
            "Gesamt netto",
            totals.totalNet,
            totalAreaX,
            valueX,
            valueWidth,
            invoice.currency,
            true,
        );
    }

    if(
        invoice.taxTreatment !== "reverse_charge"
    ){
        if(
            Array.isArray(totals.taxBreakdown) &&
            totals.taxBreakdown.length > 0
        ){
            doc.moveDown(0.15);

            totals.taxBreakdown.forEach(
                (tax) => {
                    ensureSpace(
                        doc,
                        SPACING.totalRow,
                    );

                    renderTotalRow(
                        doc,
                        `${formatNumber(tax.taxRate)} % MwSt.`,
                        tax.taxAmount,
                        totalAreaX,
                        valueX,
                        valueWidth,
                        invoice.currency,
                    );
                },
            );
        }
        else if(
            totals.totalTax !== undefined
        ){
            ensureSpace(
                doc,
                SPACING.totalRow,
            );

            renderTotalRow(
                doc,
                "Umsatzsteuer",
                totals.totalTax,
                totalAreaX,
                valueX,
                valueWidth,
                invoice.currency,
            );
        }

        if(totals.totalGross !== undefined){
            ensureSpace(
                doc,
                SPACING.totalRow + 40,
            );

            doc.moveDown(0.45);

            drawLine(
                doc,
                totalAreaX,
                CONTENT.right,
            );

            doc.moveDown(0.35);

            renderTotalRow(
                doc,
                "Gesamt brutto",
                totals.totalGross,
                totalAreaX,
                valueX,
                valueWidth,
                invoice.currency,
                true,
            );
        }

        return;
    }

    ensureSpace(
        doc,
        SPACING.totalRow + 40,
    );

    doc.moveDown(0.45);

    drawLine(
        doc,
        totalAreaX,
        CONTENT.right,
    );

    doc.moveDown(0.35);

    renderTotalRow(
        doc,
        "Rechnungsbetrag",
        totals.totalNet,
        totalAreaX,
        valueX,
        valueWidth,
        invoice.currency,
        true,
    );
}


// -----------------------------------------------------------------------------
// Total row
// -----------------------------------------------------------------------------

function renderTotalRow(
    doc,
    label,
    value,
    labelX,
    valueX,
    valueWidth,
    currency = "EUR",
    bold = false,
) {
    doc
        .font(
            bold
                ? "Helvetica-Bold"
                : "Helvetica",
        )
        .fontSize(
            bold
                ? 10
                : 9,
        )
        .fillColor(COLORS.text);

    const y = doc.y;

    doc.text(
        label,
        labelX,
        y,
        {
            width:
                valueX -
                labelX -
                8,

            lineBreak: false,
            ellipsis: true,
        },
    );

    doc.text(
        formatCurrency(
            value,
            currency,
        ),
        valueX,
        y,
        {
            width: valueWidth,
            align: "right",
            lineBreak: false,
        },
    );

    doc.y =
        y +
        SPACING.totalRow;
}


// -----------------------------------------------------------------------------
// Tax information
// -----------------------------------------------------------------------------

function renderTaxInformation(doc, invoice) {
    if(
        invoice.taxTreatment !== "reverse_charge"
    ){
        return;
    }

    ensureSpace(
        doc,
        30,
    );

    doc.moveDown(
        SPACING.totalsToTaxInformation / 12,
    );

    doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor(COLORS.text);

    doc.text(
        "Steuerschuldnerschaft des Leistungsempfängers",
        CONTENT.x,
        doc.y,
        {
            width: CONTENT.width,
            lineBreak: false,
            ellipsis: true,
        },
    );
}


// -----------------------------------------------------------------------------
// Payment information
// -----------------------------------------------------------------------------

function renderPaymentInformation(doc, invoice) {
    const bank =
        invoice.seller?.bank;

    const hasBankData =
        Boolean(
            bank?.bankName ||
            bank?.iban ||
            bank?.bic,
        );

    const hasDueDate =
        Boolean(invoice.dueDate);

    if(
        !hasBankData &&
        !hasDueDate
    ){
        return;
    }

    /*
     * Zahlungsinformationen werden bewusst absolut
     * positioniert.
     *
     * Dadurch kann dieser Block selbst keine neue
     * PDFKit-Seite erzeugen.
     */
    const paymentX =
        CONTENT.x;

    const paymentY =
        PAGE.height -
        145;

    doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor(COLORS.text);

    doc.text(
        "Zahlungsinformationen",
        paymentX,
        paymentY,
        {
            width: CONTENT.width,
            lineBreak: false,
            ellipsis: true,
        },
    );

    let y =
        paymentY +
        18;

    doc
        .font("Helvetica")
        .fontSize(8.5);

    if(hasDueDate){
        doc.text(
            `Bitte überweisen Sie den Rechnungsbetrag bis zum ${formatDate(invoice.dueDate)}.`,
            paymentX,
            y,
            {
                width: CONTENT.width,
                lineBreak: false,
                ellipsis: true,
            },
        );

        y += 16;
    }

    if(hasBankData){
        if(bank.bankName){
            doc.text(
                bank.bankName,
                paymentX,
                y,
                {
                    width: CONTENT.width,
                    lineBreak: false,
                    ellipsis: true,
                },
            );

            y += 12;
        }

        if(bank.iban){
            doc.text(
                `IBAN: ${bank.iban}`,
                paymentX,
                y,
                {
                    width: CONTENT.width,
                    lineBreak: false,
                    ellipsis: true,
                },
            );

            y += 12;
        }

        if(bank.bic){
            doc.text(
                `BIC: ${bank.bic}`,
                paymentX,
                y,
                {
                    width: CONTENT.width,
                    lineBreak: false,
                    ellipsis: true,
                },
            );
        }
    }
}


// -----------------------------------------------------------------------------
// Seller legal information
// -----------------------------------------------------------------------------

function renderSellerLegalInformation(doc, seller) {
    if(!seller){
        return;
    }

    const values = [];

    if(seller.taxNumber){
        values.push(
            `Steuernummer: ${seller.taxNumber}`,
        );
    }

    if(seller.vatId){
        values.push(
            `USt-IdNr.: ${seller.vatId}`,
        );
    }

    if(values.length === 0){
        return;
    }

    /*
     * Die rechtlichen Angaben werden fest am unteren
     * Rand der aktuellen Seite positioniert.
     */
    const legalY =
        PAGE.height -
        65;

    doc
        .font("Helvetica")
        .fontSize(7.5)
        .fillColor(COLORS.muted);

    doc.text(
        values.join("  |  "),
        CONTENT.x,
        legalY,
        {
            width: CONTENT.width,
            align: "left",
            lineBreak: false,
            ellipsis: true,
        },
    );

    doc.fillColor(
        COLORS.text,
    );
}


// -----------------------------------------------------------------------------
// Remove trailing blank pages
// -----------------------------------------------------------------------------

/**
 * Entfernt leere Seiten am Ende des Dokuments.
 *
 * PDFKit kann durch einen Textblock, der knapp über das Ende
 * des verfügbaren Bereichs hinausgeht, intern eine neue Seite
 * erzeugen. Wenn danach kein sichtbarer Inhalt mehr folgt,
 * bleibt diese Seite leer.
 *
 * Wir entfernen deshalb ALLE leeren Seiten am Ende.
 *
 * Die interne PDFKit-Seitenstruktur wird hier bewusst verwendet.
 * Das funktioniert mit den aktuell verwendeten PDFKit-Versionen.
 */
function removeTrailingBlankPages(
    doc,
    pageHasContent,
) {
    let range =
        doc.bufferedPageRange();

    /*
     * Es können theoretisch mehrere leere Seiten
     * hintereinander entstanden sein.
     */
    while(range.count > 1){
        const lastIndex =
            range.start +
            range.count -
            1;

        if(pageHasContent[lastIndex]){
            break;
        }

        try{
            const pagesDict =
                doc._root.data.Pages.data;

            pagesDict.Kids.pop();

            pagesDict.Count -= 1;

            if(Array.isArray(doc._pageBuffer)){
                doc._pageBuffer.pop();
            }

            delete pageHasContent[lastIndex];
        }
        catch(error){
            /*
             * Falls sich die interne PDFKit-Struktur in einer
             * zukünftigen Version geändert hat, wird das Dokument
             * nicht beschädigt.
             */
            break;
        }

        range =
            doc.bufferedPageRange();
    }

    /*
     * Nach dem Entfernen auf die letzte vorhandene Seite wechseln.
     */
    range =
        doc.bufferedPageRange();

    const lastExistingPage =
        range.start +
        range.count -
        1;

    doc.switchToPage(
        lastExistingPage,
    );
}


// -----------------------------------------------------------------------------
// Page numbers
// -----------------------------------------------------------------------------

function renderPageNumbers(doc) {
    const range =
        doc.bufferedPageRange();

    const totalPages =
        range.count;

    for(
        let i = range.start;
        i < range.start + range.count;
        i++
    ){
        doc.switchToPage(i);

        const footerY =
            doc.page.height -
            30;

        doc
            .font("Helvetica")
            .fontSize(7)
            .fillColor(COLORS.muted);

        doc.text(
            `Seite ${i + 1} von ${totalPages}`,
            CONTENT.x,
            footerY,
            {
                width: CONTENT.width,
                align: "center",
                lineBreak: false,
            },
        );

        doc.fillColor(
            COLORS.text,
        );
    }
}


// -----------------------------------------------------------------------------
// Drawing helpers
// -----------------------------------------------------------------------------

function drawLine(
    doc,
    startX = CONTENT.x,
    endX = CONTENT.right,
) {
    const y = doc.y;

    doc
        .save()
        .moveTo(
            startX,
            y,
        )
        .lineTo(
            endX,
            y,
        )
        .lineWidth(0.7)
        .stroke()
        .restore();

    doc.y =
        y +
        6;
}


function drawLightLine(doc) {
    const y = doc.y;

    doc
        .save()
        .moveTo(
            CONTENT.x,
            y,
        )
        .lineTo(
            CONTENT.right,
            y,
        )
        .lineWidth(0.35)
        .strokeColor(
            COLORS.lightLine,
        )
        .stroke()
        .restore();

    doc.y =
        y +
        1;

    doc.strokeColor(
        COLORS.text,
    );
}


// -----------------------------------------------------------------------------
// Calculation helpers
// -----------------------------------------------------------------------------

function calculateItemTotal(item) {
    const quantity =
        Number(item.quantity) || 0;

    const unitPrice =
        Number(item.unitPrice) || 0;

    let total =
        quantity *
        unitPrice;

    if(
        item.discountType ===
        "percentage"
    ){
        const discountValue =
            Number(
                item.discountValue,
            ) || 0;

        total -=
            total *
            (
                discountValue /
                100
            );
    }

    if(
        item.discountType ===
        "fixed"
    ){
        const discountValue =
            Number(
                item.discountValue,
            ) || 0;

        total -=
            discountValue;
    }

    return Math.max(
        total,
        0,
    );
}


function getDiscountText(
    item,
    currency,
) {
    if(
        item.discountType ===
        "percentage"
    ){
        return (
            `Rabatt: ` +
            `${formatNumber(
                item.discountValue,
            )} %`
        );
    }

    if(
        item.discountType ===
        "fixed"
    ){
        return (
            `Rabatt: ` +
            `${formatCurrency(
                item.discountValue,
                currency,
            )}`
        );
    }

    return "";
}


// -----------------------------------------------------------------------------
// Formatting
// -----------------------------------------------------------------------------

function getUnitLabel(unit) {
    const units = {
        hour: "Stunde",
        hours: "Stunden",

        kilometer: "km",

        meter: "m",

        square_meter: "m²",

        piece: "Stück",
        pieces: "Stück",

        day: "Tag",
        days: "Tage",

        flat: "Pauschal",
        lump: "Pauschal",
    };

    return (
        units[unit] ||
        unit ||
        ""
    );
}


function formatCurrency(
    value,
    currency = "EUR",
) {
    return new Intl.NumberFormat(
        "de-DE",
        {
            style: "currency",
            currency,
        },
    ).format(
        Number(value) || 0,
    );
}


function formatQuantity(value) {
    return new Intl.NumberFormat(
        "de-DE",
        {
            maximumFractionDigits: 2,
        },
    ).format(
        Number(value) || 0,
    );
}


function formatNumber(value) {
    return new Intl.NumberFormat(
        "de-DE",
        {
            maximumFractionDigits: 2,
        },
    ).format(
        Number(value) || 0,
    );
}


function formatDate(value) {
    const date =
        new Date(value);

    if(
        Number.isNaN(
            date.getTime(),
        )
    ){
        return "";
    }

    return new Intl.DateTimeFormat(
        "de-DE",
    ).format(date);
}


function getCountryName(countryCode) {
    const countries = {
        DE: "Deutschland",
        AT: "Österreich",
        CH: "Schweiz",
    };

    return (
        countries[countryCode] ||
        countryCode ||
        ""
    );
}
