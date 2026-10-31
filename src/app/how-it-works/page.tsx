import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "How it works",
  description: "Learn how PredNim works and how to get started with your reading journey.",
};

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-24">
          <h1 className="font-display text-4xl font-bold text-ink mb-12">How PredNim works</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: "1",
                title: "Choose your plan",
                description: "Select monthly, 6-month, or annual membership. All plans give you unlimited access to 5,000+ books.",
              },
              {
                step: "2",
                title: "Browse & read",
                description: "Explore our curated library. Read on any device—phone, tablet, or desktop. Offline reading included.",
              },
              {
                step: "3",
                title: "Enjoy perks",
                description: "Get exclusive author interviews, access to our members-only book club, and personalized recommendations.",
              },
            ].map((item) => (
              <div key={item.step} className="border border-line/50 rounded-lg p-8 bg-card/50">
                <div className="text-3xl font-bold text-accent mb-4">{item.step}</div>
                <h3 className="font-display text-xl font-bold text-ink mb-3">{item.title}</h3>
                <p className="text-muted">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded-lg p-8">
            <h2 className="font-display text-2xl font-bold text-ink mb-4">What's included</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted">
              {[
                "✓ 5,000+ hand-picked books",
                "✓ Unlimited reading",
                "✓ Offline access",
                "✓ Sync across devices",
                "✓ 7-day free trial",
                "✓ Cancel anytime",
                "✓ Priority support (6-month+)",
                "✓ Members-only book club (annual)",
              ].map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
