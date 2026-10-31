import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "About PredNim",
  description: "Premium adult book subscription service.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24">
          <h1 className="font-display text-4xl font-bold text-ink mb-8">About PredNim</h1>
          <p className="text-muted mb-6">Premium adult book subscription service with unlimited access to 5,000+ titles.</p>
          <p className="text-muted">Full company information coming soon.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
