const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const emailUser = process.env.GMAIL_USER;
const emailPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

app.get("/health", async (req, res) => {
  const emailConfigured = Boolean(emailUser && emailPassword);

  if (!emailConfigured) {
    return res.status(503).json({
      status: "degraded",
      emailConfigured: false,
      smtpReady: false,
      smtpError: "GMAIL_USER_OR_APP_PASSWORD_MISSING",
    });
  }

  try {
    await transporter.verify();
    return res.status(200).json({
      status: "ok",
      emailConfigured: true,
      smtpReady: true,
    });
  } catch (error) {
    console.error("SMTP health check failed:", error);
    return res.status(503).json({
      status: "degraded",
      emailConfigured: true,
      smtpReady: false,
      smtpError: error.code || "SMTP_CONNECTION_FAILED",
      smtpResponseCode: error.responseCode || null,
    });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required",
      });
    }

    if (!emailUser || !emailPassword) {
      console.error("Contact email is not configured on the backend");
      return res.status(503).json({
        message: "Email service is not configured",
      });
    }

    await transporter.sendMail({
      from: emailUser,
      to: emailUser,
      replyTo: email,
      subject: `New Form Submission from ${name}`,
      html: `
        <h2>New Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return res.status(502).json({
      message: "Email service could not send the message",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
