import { useState } from "react";
import "./Contact.css";
import TechText from "../components/TechText";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 90000);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
          signal: controller.signal,
        },
      );
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setStatus({
        type: "success",
        message: "Thanks for reaching out. Your message was received.",
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.name === "AbortError"
            ? "The email service took too long to respond. Please try again."
            : error.message ||
              "We could not send your message. Please try again shortly.",
      });
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page" id="contact">
      <div className="contact-shell">
        <div className="contact-heading">
          <TechText
            text="Let's Contact"
            fontWeight={600}
            fontSize={150}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
            fontFamily=""
            color="#ffffff"
            accentColor="#ffffff"
            letterSpacing={-0.05}
            reach={200}
            softness={0.7}
            strokeWidth={1.5}
            speed={1}
            lineStyle="dashed"
            selection
            labels
            draggable
            sweep
          />
        </div>
        <div className="contact-topbar">
          <a className="contact-back-link" href="#home">
            Back
          </a>
        </div>
        <div className="contact-layout">
          <section className="contact-intro" aria-labelledby="contact-title">
            <h1 id="contact-title">
              Have an idea?
              <span>Let&apos;s talk.</span>
            </h1>
            <p className="contact-copy">
              Tell me what you&apos;re working on, where you&apos;re stuck, or
              what you want to make next. I&apos;ll get back to you as soon as I
              can.
            </p>

            <div className="contact-details">
              <div>
                <span>Email</span>
                <a href="mailto:navinkumar677886@gmail.com">
                  navinkumar677886@gmail.com
                </a>
              </div>
              <div>
                <span>Based in</span>
                <p>India · Working worldwide</p>
              </div>
            </div>
          </section>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-heading">
              <span>Send a message</span>
              <span className="required-note">* Required</span>
            </div>

            <div className="contact-field-row">
              <label className="contact-field">
                <span>
                  Name <b>*</b>
                </span>
                <input
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </label>
              <label className="contact-field">
                <span>
                  Email <b>*</b>
                </span>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </label>
            </div>

            <label className="contact-field">
              <span>
                Phone <small>Optional</small>
              </span>
              <input
                name="phone"
                type="tel"
                placeholder="+91 00000 00000"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </label>

            <label className="contact-field">
              <span>
                Message <b>*</b>
              </span>
              <textarea
                name="message"
                placeholder="What can I help you bring to life?"
                value={form.message}
                onChange={handleChange}
                rows="6"
                required
              />
            </label>

            <div className="contact-submit-row">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send message"}
                <span aria-hidden="true">↗</span>
              </button>
              <p>Usually replies within 1–2 business days.</p>
            </div>

            {status.message && (
              <p className={`contact-status ${status.type}`} role="status">
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}

export default Contact;
