import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact PredNim support.",
};

export default function ContactPage() {

  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24">
          <h1 className="font-display text-4xl font-bold text-ink mb-2">Contact Support</h1>
          <p className="text-muted text-lg mb-8">Have a question? Send us a message and we'll respond within 24 hours.</p>

          <ContactForm />

          <div className="space-y-4 border-t border-line/30 pt-8">
            <div className="rounded-lg border border-line/50 bg-card/50 p-6">
              <h2 className="font-display text-lg font-bold text-ink mb-3">Questions?</h2>
              <p className="text-muted mb-4">Check our <a href="/faq" className="text-accent hover:text-accent-dim font-semibold">FAQ</a> for common questions about billing, subscriptions, and how to use PredNim.</p>
            </div>

            <div className="rounded-lg border border-accent/30 bg-accent/5 p-6">
              <h2 className="font-display text-lg font-bold text-ink mb-3">Account Issues</h2>
              <p className="text-muted">If you need help with your account, log in and use the help centre in your dashboard.</p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
