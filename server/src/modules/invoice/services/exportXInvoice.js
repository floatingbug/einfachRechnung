const model = require("../models");

function createError(status, message){
	const error = new Error(message);
	error.status = status;

	return error;
}

function escapeXml(value){
	return String(value || "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function buildItemsXml(items){
	return items.map((item, index) => {
		return `
		<ram:IncludedSupplyChainTradeLineItem>
			<ram:AssociatedDocumentLineDocument>
				<ram:LineID>${index + 1}</ram:LineID>
			</ram:AssociatedDocumentLineDocument>
			<ram:SpecifiedTradeProduct>
				<ram:Name>${escapeXml(item.name)}</ram:Name>
				<ram:Description>${escapeXml(item.description || "")}</ram:Description>
			</ram:SpecifiedTradeProduct>
			<ram:SpecifiedLineTradeAgreement>
				<ram:NetPriceProductTradePrice>
					<ram:ChargeAmount>${item.unitPrice.toFixed(2)}</ram:ChargeAmount>
				</ram:NetPriceProductTradePrice>
			</ram:SpecifiedLineTradeAgreement>
			<ram:SpecifiedLineTradeDelivery>
				<ram:BilledQuantity unitCode="C62">${item.quantity}</ram:BilledQuantity>
			</ram:SpecifiedLineTradeDelivery>
			<ram:SpecifiedLineTradeSettlement>
				<ram:ApplicableTradeTax>
					<ram:TypeCode>VAT</ram:TypeCode>
					<ram:CategoryCode>S</ram:CategoryCode>
					<ram:RateApplicablePercent>${item.taxRate.toFixed(2)}</ram:RateApplicablePercent>
				</ram:ApplicableTradeTax>
				<ram:SpecifiedTradeSettlementLineMonetarySummation>
					<ram:LineTotalAmount>${item.netTotal.toFixed(2)}</ram:LineTotalAmount>
				</ram:SpecifiedTradeSettlementLineMonetarySummation>
			</ram:SpecifiedLineTradeSettlement>
		</ram:IncludedSupplyChainTradeLineItem>`;
	}).join("");
}

module.exports = async ({ invoiceId }) => {
	const invoice = await model.findById({ invoiceId });

	if (!invoice) {
		throw createError(404, "Invoice not found");
	}

	if (invoice.status === "draft") {
		throw createError(400, "Draft invoices cannot be exported as XRechnung");
	}

	if (invoice.status === "cancelled") {
		throw createError(400, "Cancelled invoices cannot be exported as XRechnung");
	}

	const itemsXml = buildItemsXml(invoice.items);

	return `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice
	xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
	xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
	xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">

	<rsm:ExchangedDocumentContext>
		<ram:GuidelineSpecifiedDocumentContextParameter>
			<ram:ID>urn:cen.eu:en16931:2017</ram:ID>
		</ram:GuidelineSpecifiedDocumentContextParameter>
	</rsm:ExchangedDocumentContext>

	<rsm:ExchangedDocument>
		<ram:ID>${escapeXml(invoice.invoiceNumber)}</ram:ID>
		<ram:TypeCode>380</ram:TypeCode>
		<ram:IssueDateTime>
			<udt:DateTimeString format="102">${invoice.invoiceDate.replace(/-/g, "")}</udt:DateTimeString>
		</ram:IssueDateTime>
	</rsm:ExchangedDocument>

	<rsm:SupplyChainTradeTransaction>
		${itemsXml}

		<ram:ApplicableHeaderTradeAgreement>
			<ram:SellerTradeParty>
				<ram:Name>${escapeXml(invoice.seller.name)}</ram:Name>
				<ram:PostalTradeAddress>
					<ram:PostcodeCode>${escapeXml(invoice.seller.postalCode)}</ram:PostcodeCode>
					<ram:LineOne>${escapeXml(invoice.seller.street)}</ram:LineOne>
					<ram:CityName>${escapeXml(invoice.seller.city)}</ram:CityName>
					<ram:CountryID>${escapeXml(invoice.seller.countryCode)}</ram:CountryID>
				</ram:PostalTradeAddress>
			</ram:SellerTradeParty>

			<ram:BuyerTradeParty>
				<ram:Name>${escapeXml(invoice.customer.name)}</ram:Name>
				<ram:PostalTradeAddress>
					<ram:PostcodeCode>${escapeXml(invoice.customer.postalCode)}</ram:PostcodeCode>
					<ram:LineOne>${escapeXml(invoice.customer.street)}</ram:LineOne>
					<ram:CityName>${escapeXml(invoice.customer.city)}</ram:CityName>
					<ram:CountryID>${escapeXml(invoice.customer.countryCode)}</ram:CountryID>
				</ram:PostalTradeAddress>
			</ram:BuyerTradeParty>
		</ram:ApplicableHeaderTradeAgreement>

		<ram:ApplicableHeaderTradeDelivery/>

		<ram:ApplicableHeaderTradeSettlement>
			<ram:InvoiceCurrencyCode>${escapeXml(invoice.currency)}</ram:InvoiceCurrencyCode>

			<ram:ApplicableTradeTax>
				<ram:CalculatedAmount>${invoice.taxAmount.toFixed(2)}</ram:CalculatedAmount>
				<ram:TypeCode>VAT</ram:TypeCode>
				<ram:BasisAmount>${invoice.netTotal.toFixed(2)}</ram:BasisAmount>
				<ram:CategoryCode>S</ram:CategoryCode>
				<ram:RateApplicablePercent>${invoice.items[0]?.taxRate?.toFixed(2) || "19.00"}</ram:RateApplicablePercent>
			</ram:ApplicableTradeTax>

			<ram:SpecifiedTradePaymentTerms>
				<ram:DueDateDateTime>
					<udt:DateTimeString format="102">${invoice.dueDate.replace(/-/g, "")}</udt:DateTimeString>
				</ram:DueDateDateTime>
			</ram:SpecifiedTradePaymentTerms>

			<ram:SpecifiedTradeSettlementHeaderMonetarySummation>
				<ram:LineTotalAmount>${invoice.netTotal.toFixed(2)}</ram:LineTotalAmount>
				<ram:TaxBasisTotalAmount>${invoice.netTotal.toFixed(2)}</ram:TaxBasisTotalAmount>
				<ram:TaxTotalAmount currencyID="${escapeXml(invoice.currency)}">${invoice.taxAmount.toFixed(2)}</ram:TaxTotalAmount>
				<ram:GrandTotalAmount>${invoice.grossTotal.toFixed(2)}</ram:GrandTotalAmount>
				<ram:DuePayableAmount>${invoice.openAmount.toFixed(2)}</ram:DuePayableAmount>
			</ram:SpecifiedTradeSettlementHeaderMonetarySummation>
		</ram:ApplicableHeaderTradeSettlement>
	</rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>`;
};
