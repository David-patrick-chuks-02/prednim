import type { Metadata } from "next";
import { Pricing } from "@/components/pricing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Pricing Plans",
  description: "Choose the perfect PredNim subscription plan for your reading habits.",
};

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              Our pricing plans
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base text-muted">
              Choose the membership that fits your reading style. All plans include unlimited access to our full library.
            </p>
          </div>
        </div>
        <Pricing />
      </main>
      <SiteFooter />
    </>
  );
}
