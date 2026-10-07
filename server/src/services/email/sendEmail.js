const nodemailer = require("nodemailer");
const config = require("../../config");

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  secure: config.smtpSecure,
  auth: {
    user: config.smtpUser,
    pass: config.smtpPass,
  },
});

module.exports = async ({
  to,
  subject,
  text,
  html,
  attachments,
}) => {
  return transporter.sendMail({
    from: config.mailFrom,
    to,
    subject,
    text,
    html,
    attachments,
  });
};
