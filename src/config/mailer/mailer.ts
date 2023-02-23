import nodemailer from "nodemailer";
const GOOGLE_APP_NAME = process.env.GOOGLE_APP_NAME;
const GOOGLE_APP_PASSWORD = process.env.GOOGLE_APP_PASSWORD;

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GOOGLE_APP_NAME,
    pass: GOOGLE_APP_PASSWORD,
  },
});


