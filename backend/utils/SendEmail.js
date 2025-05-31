import { config } from "dotenv";
config();
import nodemailer from "nodemailer";
import emailTemplate from "./email.formant.js";
const SendEmail = async ({
  to,
  subject,
  message,
  userName,
  actionLink,
  actionText,
  unsubscribeLink,
}) => {
  const transport = nodemailer.createTransport({
    host: process.env.HOST_NAME,
    port: process.env.HOST_PORT,
    secure: process.env.HOST_PORT == 465,
    auth: {
      user: process.env.HOST_EMAIL,
      pass: process.env.HOST_PASS,
    },
  });
  const html = emailTemplate({
    subject,
    message,
    unsubscribeLink,
    actionLink,
    actionText,
    userName,
  });
  await transport.sendMail({
    from: `"Globe Trekker"  <${process.env.HOST_EMAIL}>`,
    to,
    subject,
    html,
  });
};
export default SendEmail;
