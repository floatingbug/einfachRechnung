const models = require("../models");
const emailService = require("../../../services/email");
const pdfService = require("./getPdf");
const { handleError } = require("../../../utils");

module.exports = async ({ userId, offerNumber }) => {
  const offer = await models.getOfferByOfferNumber({
    userId,
    offerNumber,
  });

  if (!offer) {
    handleError({
      message: "Angebot konnte nicht gefunden werden.",
      status: 404,
    });
  }

  if (!offer.customerSnapshot?.email) {
    handleError({
      message: "Für den Kunden ist keine E-Mail-Adresse hinterlegt.",
      status: 400,
    });
  }

  const pdf = await pdfService({
    userId,
    offerNumber,
  });

  const to = offer.customerSnapshot.email;

  const subject = `Angebot ${offer.offerNumber}`;

  const text = `Guten Tag,

anbei erhalten Sie unser Angebot ${offer.offerNumber}.

Bei Fragen zum Angebot können Sie sich gerne an uns wenden.

Mit freundlichen Grüßen
${offer.companySnapshot.ownerName}
${offer.companySnapshot.companyName}`;

  const html = `
    <p>Guten Tag,</p>

    <p>
      anbei erhalten Sie unser Angebot
      <strong>${offer.offerNumber}</strong>.
    </p>

    <p>
      Bei Fragen zum Angebot können Sie sich gerne an uns wenden.
    </p>

    <p>
      Mit freundlichen Grüßen<br>
      <strong>${offer.companySnapshot.ownerName}</strong><br>
      ${offer.companySnapshot.companyName}
    </p>
  `;

  const attachments = [
    {
      filename: `Angebot-${offer.offerNumber}.pdf`,
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

  await models.updateOffer({
    userId,
    offerNumber,
    update: {
      status: "sent",
    },
  })

  return {
    success: true,
    message: "Angebot wurde per E-Mail versendet.",
  };
};
