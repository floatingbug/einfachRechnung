const model = require("../models");
const emailService = require("../../../services/email");
const pdfService = require("./getPdf/getPdf");

function createError(status, message) {
  const error = new Error(message);
  error.status = status;

  return error;
}

module.exports = async ({ userId, invoiceNumber }) => {
  const invoice = await model.getInvoiceByInvoiceNumber({
    invoiceNumber,
    userId,
  });

  if (!invoice) {
    throw createError(404, "Rechnung nicht gefunden.");
  }

  if (!invoice.customer?.email) {
    throw createError(
      400,
      "Für den Kunden ist keine E-Mail-Adresse hinterlegt."
    );
  }

  const pdf = await pdfService({
    userId,
    invoiceNumber,
  });

  const to = invoice.customer.email;

  const subject = `Rechnung ${invoice.invoiceNumber}`;

  const text = `Guten Tag,

anbei erhalten Sie Ihre Rechnung ${invoice.invoiceNumber}.

Bei Fragen zur Rechnung können Sie sich gerne an uns wenden.

Mit freundlichen Grüßen
${invoice.seller.ownerName}
${invoice.seller.companyname}`;

  const html = `
    <p>Guten Tag,</p>

    <p>
      anbei erhalten Sie Ihre Rechnung
      <strong>${invoice.invoiceNumber}</strong>.
    </p>

    <p>
      Bei Fragen zur Rechnung können Sie sich gerne an uns wenden.
    </p>

    <p>
      Mit freundlichen Grüßen<br>
      <strong>${invoice.seller.ownerName}</strong><br>
      ${invoice.seller.companyName}
    </p>
  `;

  const attachments = [
    {
      filename: `Rechnung-${invoice.invoiceNumber}.pdf`,
      content: pdf,
      contentType: "application/pdf",
    },
  ];

  await emailService.sendEmail({
    to,
    subject,
    text,
    html,
    attachments,
  });

  await model.updateInvoiceStatus({
    invoiceNumber,
    status: "sent",
  })

  return {
    success: true,
    message: "Rechnung wurde per E-Mail versendet.",
  };
};
