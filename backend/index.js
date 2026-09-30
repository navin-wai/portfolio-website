const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  requireTLS: process.env.SMTP_SECURE !== "true",
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 30000,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, ""),
  },
});

app.get("/health", async (req, res) => {
  const emailConfigured = Boolean(
    process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD,
  );

  if (!emailConfigured) {
    return res.status(503).json({
      status: "degraded",
      emailConfigured: false,
      smtpReady: false,
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

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Contact email is not configured on the backend");
      return res.status(503).json({
        message: "Email service is not configured",
      });
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Form Submission from ${name}`,
      html: `
        <h2>New Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);

    res.status(502).json({
      message: "Email service could not send the message",
    });
  }
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:5000");
});
