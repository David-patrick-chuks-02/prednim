import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Get in touch with the PredNim team.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24">
          <h1 className="font-display text-4xl font-bold text-ink mb-8">Contact us</h1>
          <p className="text-muted mb-6">Have questions? We'd love to hear from you.</p>
          <div className="space-y-4">
            <p className="text-muted"><strong>Email:</strong> hello@prednim.com</p>
            <p className="text-muted"><strong>Support:</strong> support@prednim.com</p>
            <p className="text-muted"><strong>Address:</strong> PredNim HQ, Reading, England</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
