import nodemailer from "nodemailer";

export type EmailData = {
  to: string;
  subject: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

export async function sendEmail({ to, subject, message }: EmailData) {
  const mailData = {
    to: to,
    subject: `[BLOG] ${subject}`,
    html: `
      <h1>${subject}</h1>
      <div>${message}</div>
      </br>
      <p>보낸사람 : ${process.env.AUTH_USER}</p>
    `,
  };

  try {
    const result = await transporter.sendMail(mailData);
    console.log("Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
