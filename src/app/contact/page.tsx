import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
          <h1 className="font-display text-4xl font-bold text-ink mb-8">Contact</h1>
          <p className="text-muted">Contact information coming soon.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
