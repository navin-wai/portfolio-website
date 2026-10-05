const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const resend = new Resend(process.env.RESEND_API_KEY);
const emailTo = process.env.EMAIL_TO;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  const configured = Boolean(process.env.RESEND_API_KEY && emailTo);

  res.status(configured ? 200 : 503).json({
    status: configured ? "ok" : "degraded",
    emailConfigured: configured,
  });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required",
      });
    }

    const { data, error } = await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>",
      to: [emailTo],
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

    if (error) {
      console.error("Resend error:", error);

      return res.status(502).json({
        message: "Email service could not send the message",
      });
    }

    console.log("Email sent:", data);

    return res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact email error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
