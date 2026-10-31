import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Help centre",
  description: "Get help with your PredNim account and subscription.",
};

export default function HelpPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24">
          <h1 className="font-display text-4xl font-bold text-ink mb-8">Help centre</h1>
          <p className="text-muted mb-6">Need help? Check out our FAQ or contact support.</p>
          <div className="space-y-4">
            <a href="/faq" className="block text-accent hover:text-accent-dim font-semibold">→ Browse FAQ</a>
            <a href="/contact" className="block text-accent hover:text-accent-dim font-semibold">→ Contact support</a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
