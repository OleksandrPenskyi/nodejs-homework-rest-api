/* eslint-disable no-useless-catch */
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async ({ to, subject, text = "", html }) => {
  try {
    const mail = {
      from: "oleksadrbig@ex.ua",
      to,
      subject,
      text,
      html,
    };
    const result = await sgMail.send(mail);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;
