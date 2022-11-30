import nodemailerConfig from "./nodemailerConfig.js";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async ({ to, subject, html }) => {
  // we are returning information about our email and it is promise
  // and that's why we don't use "await" right here
  return nodemailerConfig.sendMail({
    from: `Digital Creaftsman <${process.env.EMAIL_SENDER}>`,
    to,
    subject,
    html,
  });
  // console.log("Message sent: %s", info);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // console.log("testAccount is: ", testAccount);
};

export default sendEmail;
