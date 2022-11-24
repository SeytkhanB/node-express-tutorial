import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
dotenv.config();

const sendEmailEthereal = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "chesley.keeling@ethereal.email",
      pass: "RrzfmTRdyWAkXKuCBr",
    },
  });

  let info = await transporter.sendMail({
    from: `Digital Creaftsman <${process.env.EMAIL_SENDER}>`,
    to: `Receiver <${process.env.EMAIL_RECEIVER}>`,
    subject: "TEST EMAIL SENDING",
    text: "Hello, World!",
  });
  // console.log("Message sent: %s", info);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  res.status(StatusCodes.OK).json({ success: true, msg: "email sent" });
};

const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: process.env.EMAIL_RECEIVER, // Change to your recipient
    from: process.env.EMAIL_SENDER, // Change to your verified sender
    subject: "TEST EMAIL SENDING",
    text: "Hello, World!",
  };
  const info = await sgMail.send(msg);
  res.status(StatusCodes.OK).json({ success: true, info });
};

export default sendEmail;
