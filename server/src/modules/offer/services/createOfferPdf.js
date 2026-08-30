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
    sellerToDivider: 12,

    offerHeaderTop: 1.5,

    offerHeaderToCustomer: 24,

    customerToProject: 16,

    projectToIntroduction: 16,

    introductionToItems: 22,

    itemsHeaderToFirstRow: 9,

    itemAfterRow: 7,

    itemsToTotals: 22,

    totalRow: 16,

    totalsToClosing: 24,

    closingToLegal: 22,

    headingToContent: 8,
};

const COLORS = {
    text: "#000000",
    muted: "#666666",
    lightLine: "#D0D0D0",
};


// -----------------------------------------------------------------------------
// Entry
// -----------------------------------------------------------------------------

module.exports = async ({offer}) => {
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
             * Wird benötigt, damit wir die Seitenzahlen nach dem
             * vollständigen Rendern auf alle Seiten schreiben können.
             */
            bufferPages: true,
        });

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
            renderOffer(
                doc,
                offer,
            );

            /*
             * Wichtig:
             *
             * Die Seitenzahlen werden erst nach dem vollständigen
             * Rendern des Inhalts hinzugefügt.
             *
             * renderPageNumbers() darf dabei KEINE neue Seite erzeugen.
             */
            renderPageNumbers(doc);

            doc.end();
        }
        catch(error) {
            reject(error);
        }
    });
};


// -----------------------------------------------------------------------------
// Offer
// -----------------------------------------------------------------------------

function renderOffer(doc, offer) {
    const seller =
        offer.companySnapshot ||
        {};

    const customer =
        offer.customerSnapshot ||
        {};

    renderSellerHeader(
        doc,
        seller,
    );

    renderOfferHeader(
        doc,
        offer,
    );

    renderCustomer(
        doc,
        customer,
    );

    renderProject(
        doc,
        offer,
    );

    renderIntroduction(
        doc,
        offer,
    );

    renderItems(
        doc,
        offer,
    );

    renderTotals(
        doc,
        offer,
    );

    renderClosing(
        doc,
        offer,
    );

    renderSellerLegalInformation(
        doc,
        seller,
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
    if(remainingHeight(doc) < neededHeight){
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
// Offer header
// -----------------------------------------------------------------------------

function renderOfferHeader(doc, offer) {
    doc.moveDown(
        SPACING.offerHeaderTop,
    );

    doc
        .font("Helvetica-Bold")
        .fontSize(24)
        .fillColor(COLORS.text);

    doc.text(
        "ANGEBOT",
        CONTENT.x,
        doc.y,
        {
            width: CONTENT.width,
            lineBreak: false,
        },
    );

    doc.moveDown(0.65);

    const rows = [];

    if(offer.offerNumber){
        rows.push([
            "Angebotsnummer",
            offer.offerNumber,
        ]);
    }

    if(offer.offerDate){
        rows.push([
            "Angebotsdatum",
            formatDate(offer.offerDate),
        ]);
    }

    if(offer.validUntil){
        rows.push([
            "Gültig bis",
            formatDate(offer.validUntil),
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
        SPACING.offerHeaderToCustomer / 12,
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
        "Angebotsempfänger",
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
        SPACING.customerToProject / 12,
    );
}


// -----------------------------------------------------------------------------
// Project
// -----------------------------------------------------------------------------

function renderProject(doc, offer) {
    if(!offer.project){
        return;
    }

    const text =
        String(offer.project).trim();

    if(!text){
        return;
    }

    doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor(COLORS.text);

    doc.text(
        "Projekt",
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

    doc.text(
        text,
        CONTENT.x,
        doc.y,
        {
            width: CONTENT.width,
        },
    );

    doc.moveDown(
        SPACING.projectToIntroduction / 12,
    );
}


// -----------------------------------------------------------------------------
// Introduction
// -----------------------------------------------------------------------------

function renderIntroduction(doc, offer) {
    if(!offer.introduction){
        return;
    }

    const text =
        String(offer.introduction).trim();

    if(!text){
        return;
    }

    doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor(COLORS.text);

    doc.text(
        text,
        CONTENT.x,
        doc.y,
        {
            width: CONTENT.width,
        },
    );

    doc.moveDown(
        SPACING.introductionToItems / 12,
    );
}


// -----------------------------------------------------------------------------
// Items
// -----------------------------------------------------------------------------

function renderItems(doc, offer) {
    const items =
        Array.isArray(offer.items)
            ? offer.items
            : [];

    if(items.length === 0){
        return;
    }

    const showTaxRate =
        offer.showTaxRatePerItem === true;

    const showItemNumbers =
        offer.showItemNumbers !== false;

    const columns =
        getItemColumns({
            showTaxRate,
            showItemNumbers,
        });

    ensureSpace(
        doc,
        45,
    );

    renderItemHeader(
        doc,
        columns,
        showItemNumbers,
    );

    items.forEach(
        (item, index) => {
            const rowHeight =
                calculateRowHeight(
                    doc,
                    item,
                    columns,
                );

            if(remainingHeight(doc) < rowHeight){
                doc.addPage();

                renderItemHeader(
                    doc,
                    columns,
                    showItemNumbers,
                );
            }

            renderItem(
                doc,
                item,
                index + 1,
                columns,
                showItemNumbers,
            );
        },
    );
}


function calculateRowHeight(doc, item, columns) {
    const fullDescription =
        buildItemDescription(item);

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

    return (
        Math.max(
            descriptionHeight,
            14,
        ) +
        10 +
        1 +
        SPACING.itemAfterRow
    );
}


function buildItemDescription(item) {
    const title =
        item.title || "";

    const description =
        item.description
            ? `${title}\n${item.description}`
            : title;

    const discount =
        getDiscountText(item);

    const fullDescription =
        discount
            ? `${description}\n${discount}`
            : description;

    return fullDescription.trim();
}


// -----------------------------------------------------------------------------
// Item columns
// -----------------------------------------------------------------------------

function getItemColumns({
    showTaxRate,
    showItemNumbers,
}) {
    if(showTaxRate){
        if(showItemNumbers){
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
            description: {
                x: 50,
                width: 215,
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

    if(showItemNumbers){
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

    return {
        description: {
            x: 50,
            width: 280,
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

function renderItemHeader(
    doc,
    columns,
    showItemNumbers,
) {
    const y = doc.y;

    doc
        .font("Helvetica-Bold")
        .fontSize(8)
        .fillColor(COLORS.text);

    if(showItemNumbers){
        doc.text(
            "Pos.",
            columns.number.x,
            y,
            {
                width: columns.number.width,
                lineBreak: false,
            },
        );
    }

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
        "Einheit",
        columns.unit.x,
        y,
        {
            width: columns.unit.width,
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
    showItemNumbers,
) {
    const quantity =
        Number(item.quantity) || 0;

    const unitPrice =
        Number(item.unitPrice) || 0;

    const total =
        calculateItemTotal(item);

    const fullDescription =
        buildItemDescription(item);

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

    if(showItemNumbers){
        doc.text(
            String(position),
            columns.number.x,
            y,
            {
                width: columns.number.width,
                lineBreak: false,
            },
        );
    }

    doc.text(
        fullDescription,
        columns.description.x,
        y,
        {
            width: columns.description.width,
            height: rowHeight,
            ellipsis: true,
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
            "EUR",
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
            "EUR",
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

function renderTotals(doc, offer) {
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

    doc.moveDown(
        SPACING.itemsToTotals / 12,
    );

    if(offer.subtotalNet !== undefined){
        ensureSpace(
            doc,
            SPACING.totalRow,
        );

        renderTotalRow(
            doc,
            "Zwischensumme netto",
            offer.subtotalNet,
            totalAreaX,
            valueX,
            valueWidth,
        );
    }

    if(
        offer.discountNet !== undefined &&
        Number(offer.discountNet) !== 0
    ){
        ensureSpace(
            doc,
            SPACING.totalRow,
        );

        renderTotalRow(
            doc,
            "Rabatt",
            -Math.abs(
                Number(offer.discountNet),
            ),
            totalAreaX,
            valueX,
            valueWidth,
        );
    }

    if(offer.totalNet !== undefined){
        ensureSpace(
            doc,
            SPACING.totalRow + 10,
        );

        doc.moveDown(0.25);

        renderTotalRow(
            doc,
            "Gesamt netto",
            offer.totalNet,
            totalAreaX,
            valueX,
            valueWidth,
            true,
        );
    }

    if(
        Array.isArray(offer.taxBreakdown) &&
        offer.taxBreakdown.length > 0
    ){
        doc.moveDown(0.15);

        offer.taxBreakdown.forEach(
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
                );
            },
        );
    }
    else if(offer.totalTax !== undefined){
        ensureSpace(
            doc,
            SPACING.totalRow,
        );

        renderTotalRow(
            doc,
            "Umsatzsteuer",
            offer.totalTax,
            totalAreaX,
            valueX,
            valueWidth,
        );
    }

    if(offer.totalGross !== undefined){
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
            offer.totalGross,
            totalAreaX,
            valueX,
            valueWidth,
            true,
        );
    }
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
            "EUR",
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
// Closing
// -----------------------------------------------------------------------------

function renderClosing(doc, offer) {
    if(!offer.closing){
        return;
    }

    const text =
        String(offer.closing).trim();

    if(!text){
        return;
    }

    doc.moveDown(
        SPACING.totalsToClosing / 12,
    );

    doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor(COLORS.text);

    doc.text(
        text,
        CONTENT.x,
        doc.y,
        {
            width: CONTENT.width,
        },
    );
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

    doc.moveDown(
        SPACING.closingToLegal / 12,
    );

    ensureSpace(
        doc,
        12,
    );

    doc
        .font("Helvetica")
        .fontSize(7.5)
        .fillColor(COLORS.muted);

    doc.text(
        values.join("  |  "),
        CONTENT.x,
        doc.y,
        {
            width: CONTENT.width,
            align: "left",
            lineBreak: false,
            ellipsis: true,
        },
    );

    doc.fillColor(COLORS.text);
}


// -----------------------------------------------------------------------------
// Page numbers
// -----------------------------------------------------------------------------

function renderPageNumbers(doc) {
    const range =
        doc.bufferedPageRange();

    const pageCount =
        range.count;

    for(
        let i = range.start;
        i < range.start + pageCount;
        i++
    ){
        doc.switchToPage(i);

        const footerY =
            doc.page.height -
            28;

        /*
         * PDFKit berechnet seine Textgrenze anhand von
         * page.margins.bottom.
         *
         * Der Footer soll aber bewusst unterhalb dieses
         * normalen Content-Bereichs stehen.
         *
         * Deshalb wird der bottom-Margin nur für die
         * Footer-Ausgabe temporär auf 0 gesetzt.
         */
        const originalBottomMargin =
            doc.page.margins.bottom;

        doc.page.margins.bottom = 0;

        doc
            .font("Helvetica")
            .fontSize(7)
            .fillColor(COLORS.muted);

        doc.text(
            `Seite ${i - range.start + 1} von ${pageCount}`,
            CONTENT.x,
            footerY,
            {
                width: CONTENT.width,
                align: "center",
                lineBreak: false,
            },
        );

        doc.page.margins.bottom =
            originalBottomMargin;

        doc.fillColor(COLORS.text);
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


function getDiscountText(item) {
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
                "EUR",
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
