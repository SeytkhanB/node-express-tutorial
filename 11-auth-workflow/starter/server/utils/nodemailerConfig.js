import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const nodemailerConfig = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default nodemailerConfig;
