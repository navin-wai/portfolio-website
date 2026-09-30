const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpSecure = process.env.SMTP_SECURE
  ? process.env.SMTP_SECURE === "true"
  : smtpPort === 465;
const resendConfigured = Boolean(
  process.env.RESEND_API_KEY &&
  process.env.RESEND_FROM_EMAIL &&
  process.env.RESEND_TO_EMAIL,
);
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: smtpPort,
  secure: smtpSecure,
  requireTLS: !smtpSecure,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 30000,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, ""),
  },
});

async function verifyEmailService() {
  if (resendConfigured) {
    const response = await fetch("https://api.resend.com/domains", {
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Resend API returned ${response.status}`);
    }

    return;
  }

  await transporter.verify();
}

async function sendEmail(mailOptions) {
  if (resendConfigured) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: [process.env.RESEND_TO_EMAIL],
        reply_to: mailOptions.replyTo,
        subject: mailOptions.subject,
        html: mailOptions.html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Resend API returned ${response.status}: ${errorBody}`);
    }

    return;
  }

  await transporter.sendMail(mailOptions);
}

app.get("/health", async (req, res) => {
  const emailConfigured =
    resendConfigured ||
    Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

  if (!emailConfigured) {
    return res.status(503).json({
      status: "degraded",
      emailConfigured: false,
      smtpReady: false,
    });
  }

  try {
    await verifyEmailService();
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

    if (
      !resendConfigured &&
      (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD)
    ) {
      console.error("Contact email is not configured on the backend");
      return res.status(503).json({
        message: "Email service is not configured",
      });
    }

    const mailOptions = {
      from: resendConfigured
        ? process.env.RESEND_FROM_EMAIL
        : process.env.GMAIL_USER,
      to: resendConfigured
        ? process.env.RESEND_TO_EMAIL
        : process.env.GMAIL_USER,
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

    await sendEmail(mailOptions);

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
