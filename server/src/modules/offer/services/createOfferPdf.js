const PDFDocument = require("pdfkit");


module.exports = async ({offer}) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            size: "A4",
            margin: 50,
            bufferPages: true,
        });

        const chunks = [];

        doc.on("data", (chunk) => {
            chunks.push(chunk);
        });

        doc.on("end", () => {
            resolve(Buffer.concat(chunks));
        });

        doc.on("error", reject);

        try {
            renderOffer(doc, offer);

            renderPageNumbers(doc);

            doc.end();
        }
        catch(error) {
            reject(error);
        }
    });
};


function renderOffer(doc, offer) {
    renderCompanyHeader(
        doc,
        offer.companySnapshot,
    );

    renderOfferHeader(
        doc,
        offer,
    );

    renderCustomer(
        doc,
        offer.customerSnapshot,
    );

    if(offer.project){
        renderProject(
            doc,
            offer.project,
        );
    }

    if(offer.introduction){
        renderTextBlock(
            doc,
            offer.introduction,
        );
    }

    renderItems(
        doc,
        offer,
    );

    renderTotals(
        doc,
        offer,
    );

    if(offer.closing){
        ensureSpace(
            doc,
            80,
        );

        renderTextBlock(
            doc,
            offer.closing,
        );
    }
}


function renderCompanyHeader(doc, company) {
    if(!company){
        return;
    }

    doc
        .font("Helvetica-Bold")
        .fontSize(18)
        .text(
            company.companyName || "",
            50,
            doc.y,
            {
                width: doc.page.width - 100,
            },
        );

    if(company.ownerName){
        doc
            .font("Helvetica")
            .fontSize(9)
            .text(
                company.ownerName,
                50,
                doc.y,
                {
                    width: doc.page.width - 100,
                },
            );
    }

    doc
        .font("Helvetica")
        .fontSize(9);

    if(company.street){
        doc.text(
            company.street,
            50,
            doc.y,
            {
                width: doc.page.width - 100,
            },
        );
    }

    const address = [
        company.postalCode,
        company.city,
    ]
        .filter(Boolean)
        .join(" ");

    if(address){
        doc.text(
            address,
            50,
            doc.y,
            {
                width: doc.page.width - 100,
            },
        );
    }

    if(company.email){
        doc.text(
            company.email,
            50,
            doc.y,
            {
                width: doc.page.width - 100,
            },
        );
    }

    if(company.phone){
        doc.text(
            company.phone,
            50,
            doc.y,
            {
                width: doc.page.width - 100,
            },
        );
    }

    doc.moveDown(1);

    drawLine(doc);
}


function renderOfferHeader(doc, offer) {
    doc.moveDown(1);

    doc
        .font("Helvetica-Bold")
        .fontSize(24)
        .text(
            "ANGEBOT",
            50,
            doc.y,
            {
                width: doc.page.width - 100,
            },
        );

    doc.moveDown(0.6);

    doc
        .font("Helvetica")
        .fontSize(10);

    if(offer.offerNumber){
        doc.text(
            `Angebotsnummer: ${offer.offerNumber}`,
            50,
            doc.y,
            {
                width: doc.page.width - 100,
            },
        );
    }

    if(offer.offerDate){
        doc.text(
            `Angebotsdatum: ${formatDate(offer.offerDate)}`,
            50,
            doc.y,
            {
                width: doc.page.width - 100,
            },
        );
    }

    if(offer.validUntil){
        doc.text(
            `Gültig bis: ${formatDate(offer.validUntil)}`,
            50,
            doc.y,
            {
                width: doc.page.width - 100,
            },
        );
    }

    doc.moveDown(1);
}


function renderCustomer(doc, customer) {
    if(!customer){
        return;
    }

    doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .text(
            "Kunde",
            50,
            doc.y,
            {
                width: doc.page.width - 100,
            },
        );

    doc.moveDown(0.4);

    doc
        .font("Helvetica")
        .fontSize(10);

    if(customer.companyName){
        doc.text(
            customer.companyName,
            50,
            doc.y,
            {
                width: doc.page.width - 100,
            },
        );
    }

    if(customer.contactPerson){
        doc.text(
            customer.contactPerson,
            50,
            doc.y,
            {
                width: doc.page.width - 100,
            },
        );
    }

    if(customer.street){
        doc.text(
            customer.street,
            50,
            doc.y,
            {
                width: doc.page.width - 100,
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
            50,
            doc.y,
            {
                width: doc.page.width - 100,
            },
        );
    }

    if(customer.countryCode){
        doc.text(
            getCountryName(customer.countryCode),
            50,
            doc.y,
            {
                width: doc.page.width - 100,
            },
        );
    }

    doc.moveDown(1);
}


function renderProject(doc, project) {
    doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .text(
            "Projekt",
            50,
            doc.y,
            {
                width: doc.page.width - 100,
            },
        );

    doc
        .font("Helvetica")
        .fontSize(10)
        .text(
            project,
            50,
            doc.y,
            {
                width: doc.page.width - 100,
            },
        );

    doc.moveDown(1);
}


function renderTextBlock(doc, text) {
    doc
        .font("Helvetica")
        .fontSize(10)
        .text(
            text,
            50,
            doc.y,
            {
                width: doc.page.width - 100,
                lineGap: 2,
            },
        );

    doc.moveDown(1.5);
}


function renderItems(doc, offer) {
    const items = Array.isArray(offer.items)
        ? offer.items
        : [];

    if(items.length === 0){
        return;
    }

    ensureSpace(
        doc,
        70,
    );

    const columns = getItemColumns(
        offer,
    );

    renderItemHeader(
        doc,
        columns,
    );

    items.forEach((item, index) => {
        renderItem(
            doc,
            item,
            index + 1,
            columns,
        );
    });
}


function getItemColumns(offer) {
    const showNumbers =
        offer.showItemNumbers !== false;

    const showTaxRate =
        offer.showTaxRatePerItem === true;

    if(showNumbers && showTaxRate){
        return {
            number: {
                x: 50,
                width: 25,
            },
            description: {
                x: 80,
                width: 180,
            },
            quantity: {
                x: 265,
                width: 45,
            },
            unit: {
                x: 315,
                width: 55,
            },
            unitPrice: {
                x: 375,
                width: 65,
            },
            taxRate: {
                x: 445,
                width: 35,
            },
            total: {
                x: 480,
                width: 65,
            },
        };
    }

    if(showNumbers){
        return {
            number: {
                x: 50,
                width: 25,
            },
            description: {
                x: 80,
                width: 220,
            },
            quantity: {
                x: 305,
                width: 45,
            },
            unit: {
                x: 355,
                width: 55,
            },
            unitPrice: {
                x: 415,
                width: 65,
            },
            total: {
                x: 485,
                width: 60,
            },
        };
    }

    if(showTaxRate){
        return {
            description: {
                x: 50,
                width: 200,
            },
            quantity: {
                x: 255,
                width: 45,
            },
            unit: {
                x: 305,
                width: 55,
            },
            unitPrice: {
                x: 365,
                width: 65,
            },
            taxRate: {
                x: 435,
                width: 35,
            },
            total: {
                x: 475,
                width: 70,
            },
        };
    }

    return {
        description: {
            x: 50,
            width: 245,
        },
        quantity: {
            x: 300,
            width: 45,
        },
        unit: {
            x: 350,
            width: 55,
        },
        unitPrice: {
            x: 410,
            width: 70,
        },
        total: {
            x: 485,
            width: 60,
        },
    };
}


function renderItemHeader(doc, columns) {
    const y = doc.y;

    doc
        .font("Helvetica-Bold")
        .fontSize(8);

    if(columns.number){
        doc.text(
            "Pos.",
            columns.number.x,
            y,
            {
                width: columns.number.width,
            },
        );
    }

    doc.text(
        "Beschreibung",
        columns.description.x,
        y,
        {
            width: columns.description.width,
        },
    );

    doc.text(
        "Menge",
        columns.quantity.x,
        y,
        {
            width: columns.quantity.width,
            align: "right",
        },
    );

    doc.text(
        "Einheit",
        columns.unit.x,
        y,
        {
            width: columns.unit.width,
        },
    );

    doc.text(
        "Einzelpreis",
        columns.unitPrice.x,
        y,
        {
            width: columns.unitPrice.width,
            align: "right",
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
        },
    );

    doc.y = y + 18;

    drawLine(doc);

    doc.moveDown(0.5);
}


function renderItem(
    doc,
    item,
    position,
    columns,
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
        getDiscountText(item);

    const fullDescription =
        discount
            ? `${description}\n${discount}`
            : description;

    const requiredHeight =
        doc.heightOfString(
            fullDescription,
            {
                width:
                    columns.description.width,
            },
        );

    ensureSpace(
        doc,
        Math.max(
            requiredHeight + 20,
            35,
        ),
    );

    const y = doc.y;

    doc
        .font("Helvetica")
        .fontSize(8);

    if(columns.number){
        doc.text(
            String(position),
            columns.number.x,
            y,
            {
                width: columns.number.width,
            },
        );
    }

    doc.text(
        fullDescription,
        columns.description.x,
        y,
        {
            width: columns.description.width,
        },
    );

    doc.text(
        formatQuantity(quantity),
        columns.quantity.x,
        y,
        {
            width: columns.quantity.width,
            align: "right",
        },
    );

    doc.text(
        getUnitLabel(item.unit),
        columns.unit.x,
        y,
        {
            width: columns.unit.width,
        },
    );

    doc.text(
        formatCurrency(unitPrice),
        columns.unitPrice.x,
        y,
        {
            width: columns.unitPrice.width,
            align: "right",
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
            },
        );
    }

    doc.text(
        formatCurrency(total),
        columns.total.x,
        y,
        {
            width: columns.total.width,
            align: "right",
        },
    );

    doc.y =
        y +
        Math.max(
            requiredHeight,
            14,
        ) +
        8;

    drawLightLine(doc);

    doc.moveDown(0.5);
}


function renderTotals(doc, offer) {
    ensureSpace(
        doc,
        180,
    );

    doc.moveDown(1);

    const x = 350;
    const valueX = 475;
    const valueWidth = 70;

    if(offer.subtotalNet !== undefined){
        renderTotalRow(
            doc,
            "Zwischensumme netto",
            offer.subtotalNet,
            x,
            valueX,
            valueWidth,
        );
    }

    if(
        offer.discountNet !== undefined &&
        offer.discountNet !== 0
    ){
        renderTotalRow(
            doc,
            "Rabatt",
            -Math.abs(
                offer.discountNet,
            ),
            x,
            valueX,
            valueWidth,
        );
    }

    if(offer.totalNet !== undefined){
        doc.moveDown(0.3);

        renderTotalRow(
            doc,
            "Gesamt netto",
            offer.totalNet,
            x,
            valueX,
            valueWidth,
            true,
        );
    }

    if(
        Array.isArray(offer.taxBreakdown) &&
        offer.taxBreakdown.length > 0
    ){
        doc.moveDown(0.4);

        offer.taxBreakdown.forEach(
            (tax) => {
                renderTotalRow(
                    doc,
                    `${formatNumber(tax.taxRate)} % MwSt.`,
                    tax.taxAmount,
                    x,
                    valueX,
                    valueWidth,
                );
            },
        );
    }
    else if(
        offer.totalTax !== undefined
    ){
        renderTotalRow(
            doc,
            "Umsatzsteuer",
            offer.totalTax,
            x,
            valueX,
            valueWidth,
        );
    }

    if(offer.totalGross !== undefined){
        doc.moveDown(0.4);

        drawLine(doc);

        doc.moveDown(0.5);

        renderTotalRow(
            doc,
            "Gesamt brutto",
            offer.totalGross,
            x,
            valueX,
            valueWidth,
            true,
        );
    }
}


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
        );

    const y = doc.y;

    doc.text(
        label,
        labelX,
        y,
        {
            width: 120,
        },
    );

    doc.text(
        formatCurrency(value),
        valueX,
        y,
        {
            width: valueWidth,
            align: "right",
        },
    );

    doc.y = y + 15;
}


function renderPageNumbers(doc) {
    const range =
        doc.bufferedPageRange();

    for(
        let index = range.start;
        index < range.start + range.count;
        index++
    ){
        doc.switchToPage(index);

        const pageNumber =
            index - range.start + 1;

        const footerY =
            doc.page.height - 35;

        doc
            .font("Helvetica")
            .fontSize(8)
            .text(
                `Seite ${pageNumber} von ${range.count}`,
                50,
                footerY,
                {
                    width:
                        doc.page.width - 100,
                    align: "center",
                },
            );
    }
}


function ensureSpace(
    doc,
    requiredHeight,
) {
    const bottom =
        doc.page.height -
        doc.page.margins.bottom;

    if(
        doc.y + requiredHeight >
        bottom
    ){
        doc.addPage();
    }
}


function drawLine(doc) {
    const y = doc.y;

    doc
        .moveTo(
            50,
            y,
        )
        .lineTo(
            doc.page.width - 50,
            y,
        )
        .lineWidth(1)
        .stroke();

    doc.y = y + 5;
}


function drawLightLine(doc) {
    const y = doc.y;

    doc
        .moveTo(
            50,
            y,
        )
        .lineTo(
            doc.page.width - 50,
            y,
        )
        .lineWidth(0.5)
        .stroke();

    doc.y = y + 1;
}


function calculateItemTotal(item) {
    const quantity =
        Number(item.quantity) || 0;

    const unitPrice =
        Number(item.unitPrice) || 0;

    let total =
        quantity * unitPrice;

    if(item.discountType === "percent"){
        const discountValue =
            Number(item.discountValue) || 0;

        total -=
            total *
            (discountValue / 100);
    }

    if(item.discountType === "fixed"){
        const discountValue =
            Number(item.discountValue) || 0;

        total -= discountValue;
    }

    return Math.max(
        total,
        0,
    );
}


function getDiscountText(item) {
    if(item.discountType === "percent"){
        return `Rabatt: ${formatNumber(item.discountValue)} %`;
    }

    if(item.discountType === "fixed"){
        return `Rabatt: ${formatCurrency(item.discountValue)}`;
    }

    return "";
}


function getUnitLabel(unit) {
    const units = {
        hour: "Stunde",
        hours: "Stunden",
        kilometer: "Kilometer",
        meter: "Meter",
        square_meter: "m²",
        piece: "Stück",
        pieces: "Stück",
        day: "Tag",
        days: "Tage",
        lump: "Pauschal",
    };

    return (
        units[unit] ||
        unit ||
        ""
    );
}


function formatCurrency(value) {
    return new Intl.NumberFormat(
        "de-DE",
        {
            style: "currency",
            currency: "EUR",
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
