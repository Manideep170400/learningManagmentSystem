require("dotenv").config();
const nodemailer = require("nodemailer");

console.log("HOST:", process.env.HOST);
console.log("SERVICE:", process.env.SERVICE);
console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
console.log("SECURE:", process.env.SECURE);
console.log("USER:", process.env.USER);
console.log("PASS:", process.env.PASS);
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  port: Number(process.env.EMAIL_PORT),
  secure: Boolean(process.env.SECURE),
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Transporter verification failed:", error);
  } else {
    console.log("Transporter ready:", success);
  }
});

module.exports = transporter;
