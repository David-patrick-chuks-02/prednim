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
                title: "Sign up",
                description: "Create your account with just an email and password. Set up takes less than 2 minutes.",
              },
              {
                step: "2",
                title: "Choose your plan",
                description: "Select monthly ($100), 6-month ($500), or annual ($1000) membership. All plans give unlimited access.",
              },
              {
                step: "3",
                title: "Start reading",
                description: "Browse community-created books. Read on any device with offline access. Cancel anytime.",
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
                "✓ Unlimited community content",
                "✓ Erotic novels & comics",
                "✓ Offline reading (download)",
                "✓ Sync across all devices",
                "✓ Discreet, secure billing",
                "✓ Cancel anytime",
                "✓ Private reading history",
                "✓ No ads or paywalls",
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
