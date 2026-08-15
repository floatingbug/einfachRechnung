const settingsModels = require("../../settings/models");
const offerModels = require("../models");
const customerModels = require("../../customers/models");
const {ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, offer}) => {
    //increase nextOfferNumber in settings.offer
    const nextOfferNumber = await settingsModels.incNextOfferNumber({
        userId,
    });

    //get offerSettings
    const offerSettings = await settingsModels.getSettings({
        userId,
        type: "offer",
    });

    //create offerNumber
    const offerNumber = formatOfferNumber({
        format: offerSettings.offerNumberFormat,
        prefix: offerSettings.offerPrefix,
        number: nextOfferNumber,
    });

    //create customer and company snapshot
    const customer = await customerModels.getCustomerById({
        customerId: offer.customerId,
    });

    if (!customer) {
        const error = new Error("Customer not found");
        error.status = 404;
        throw error;
    }

    const customerSnapshot = {
        _id: customer._id,

        customerNumber: customer.customerNumber,
        customerType: customer.customerType,

        companyName: customer.companyName ?? null,
        contactPerson: customer.contactPerson ?? null,

        firstName: customer.firstName ?? null,
        lastName: customer.lastName ?? null,

        street: customer.street,
        postalCode: customer.postalCode,
        city: customer.city,
        countryCode: customer.countryCode,

        email: customer.email,
        phone: customer.phone,

        vatId: customer.vatId ?? null,
    };

    const companySettings = await settingsModels.getSettings({
        userId,
        type: "company",
    });

    const companySnapshot = {
        companyName: companySettings.companyName,
        ownerName: companySettings.ownerName,
        street: companySettings.street,
        postalCode: companySettings.postalCode,
        city: companySettings.city,
        countryCode: companySettings.countryCode,
        email: companySettings.email,
        phone: companySettings.phone,
        website: companySettings.website,
        vatId: companySettings.vatId,
        taxNumber: companySettings.taxNumber,
    };

    //calculate sum
    const totals = calcTotals(offer);

    //create dates
    const createdAt = new Date();
    const updatedAt = new Date(createdAt);

    //create offerToSave
    const customerName =
        customer.customerType === "company"
            ? customer.companyName
            : `${customer.firstName} ${customer.lastName}`;
    
    const offerToSave = {
        userId: new ObjectId(userId),
        customerId: new ObjectId(offer.customerId),
        offerNumber,
        customerName,
        contactPerson: customer.contactPerson ?? "",
        offerDate: new Date(offer.offerDate),
        validUntil: new Date(offer.validUntil),
        project: offer.project,
        introduction: offer.introduction,
        closing: offer.closing,
        showTaxRatePerItem: offer.showTaxRatePerItem,
        showItemNumbers: offer.showItemNumbers,
        items: offer.items,
        ...totals,
        status: "draft",
        createdAt,
        updatedAt,
        customerSnapshot,
        companySnapshot,
    };

    if(customer.customerType === "company"){
        offerToSave.contactPerson = customer.contactPerson;
    }

    //save offer
    const result = await offerModels.saveOffer({
        offer: offerToSave,
    });

    if(!result.insertedId){
        const err = new Error("Fail to store offer.");
        err.code = 500;
        throw err;
    }

    return offerNumber;


    // --- helpers ---
    function formatOfferNumber({
        format,
        prefix = "",
        number,
        date = new Date(),
        numberLength = 5,
    }) {
        if (number == null) {
            throw new Error("number is required");
        }

        const year = date.getFullYear();
        const paddedNumber = String(number).padStart(numberLength, "0");

        return format
            .replaceAll("{prefix}", prefix)
            .replaceAll("{year}", String(year))
            .replaceAll("{number}", paddedNumber);
    }

    function calcTotals(offer) {
        function roundMoney(value) {
            return Math.round(value * 100) / 100;
        }

        const result = (offer.items ?? []).reduce(
            (acc, item) => {
                const lineNet = item.quantity * item.unitPrice;

                let lineDiscount = 0;

                if (item.discountType === "percentage") {
                    lineDiscount = lineNet * (item.discountValue / 100);
                } else if (item.discountType === "fixed") {
                    lineDiscount = item.discountValue;
                }

                const lineNetAfterDiscount = lineNet - lineDiscount;
                const lineTax = lineNetAfterDiscount * (item.taxRate / 100);

                acc.subtotalNet += lineNet;
                acc.discountNet += lineDiscount;
                acc.totalNet += lineNetAfterDiscount;
                acc.totalTax += lineTax;
                acc.totalGross += lineNetAfterDiscount + lineTax;

                const existingTaxRate = acc.taxBreakdown.find(
                    entry => entry.taxRate === item.taxRate
                );

                if (existingTaxRate) {
                    existingTaxRate.netAmount += lineNetAfterDiscount;
                    existingTaxRate.taxAmount += lineTax;
                } else {
                    acc.taxBreakdown.push({
                        taxRate: item.taxRate,
                        netAmount: lineNetAfterDiscount,
                        taxAmount: lineTax,
                    });
                }

                return acc;
            },
            {
                subtotalNet: 0,
                discountNet: 0,
                totalNet: 0,
                totalTax: 0,
                totalGross: 0,
                taxBreakdown: [],
            }
        );

        result.subtotalNet = roundMoney(result.subtotalNet);
        result.discountNet = roundMoney(result.discountNet);
        result.totalNet = roundMoney(result.totalNet);
        result.totalTax = roundMoney(result.totalTax);
        result.totalGross = roundMoney(result.totalGross);

        result.taxBreakdown = result.taxBreakdown.map(entry => ({
            ...entry,
            netAmount: roundMoney(entry.netAmount),
            taxAmount: roundMoney(entry.taxAmount),
        }));

        result.taxBreakdown.sort((a, b) => b.taxRate - a.taxRate);

        return result;
    }

    function roundMoney(value) {
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }
};
