"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setMessage({
        type: "success",
        text: "Message sent! We'll respond within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to send message",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "error"
              ? "bg-red-500/10 border border-red-500/20 text-red-600"
              : "bg-green-500/10 border border-green-500/20 text-green-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 mb-12">
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-line bg-background text-ink placeholder-muted focus:outline-none focus:border-accent transition"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-line bg-background text-ink placeholder-muted focus:outline-none focus:border-accent transition"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Subject</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-line bg-background text-ink focus:outline-none focus:border-accent transition"
          >
            <option value="">Select a subject</option>
            <option value="Account Issue">Account Issue</option>
            <option value="Billing">Billing</option>
            <option value="Subscription">Subscription</option>
            <option value="Technical Issue">Technical Issue</option>
            <option value="Refund Request">Refund Request</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            minLength={10}
            rows={6}
            className="w-full px-4 py-2 rounded-lg border border-line bg-background text-ink placeholder-muted focus:outline-none focus:border-accent transition resize-none"
            placeholder="Tell us how we can help..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-accent-dim disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </>
  );
}
