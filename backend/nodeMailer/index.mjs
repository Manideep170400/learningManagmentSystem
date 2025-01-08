import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  port: Number(process.env.EMAIL_PORT),
  secure: Boolean(process.env.SECURE),
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const sendMail = (mailOptions) => {
  return transporter.sendMail(mailOptions);
};

export { sendMail };
