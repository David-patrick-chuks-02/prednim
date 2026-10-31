import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about PredNim subscription service.",
};

const FAQ = [
  {
    q: "Can I cancel anytime?",
    a: "Yes! You can cancel your subscription anytime without penalties or additional fees. Your access continues until the end of your billing period.",
  },
  {
    q: "How does billing work?",
    a: "Billing is secure and discreet. Your statement shows only a generic charge. We accept all major credit cards. Choose monthly, 6-month, or annual plans.",
  },
  {
    q: "Can I read offline?",
    a: "Yes. Download books to your device and read them offline. Offline reading is available on all plans.",
  },
  {
    q: "Which devices are supported?",
    a: "PredNim works on iOS, Android, Mac, Windows, and web browsers. Your reading progress syncs across all devices.",
  },
  {
    q: "How often are new books added?",
    a: "We add new titles every week. Our curated team hand-picks books to ensure the highest quality.",
  },
  {
    q: "Can I gift a membership?",
    a: "Yes! Gift memberships are available in 1-month, 3-month, 6-month, and 1-year options. Perfect for book lovers.",
  },
  {
    q: "What if I have technical issues?",
    a: "Our support team is here to help. Email support@prednim.com or use the help centre in your account dashboard.",
  },
  {
    q: "Are there parental controls?",
    a: "Yes. You can create child accounts with restricted access to age-appropriate content only.",
  },
];

export default function FAQPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24">
          <h1 className="font-display text-4xl font-bold text-ink mb-4">Frequently asked questions</h1>
          <p className="text-muted mb-12">Find answers to common questions about PredNim.</p>

          <div className="space-y-6">
            {FAQ.map((item, idx) => (
              <details key={idx} className="group border border-line/50 rounded-lg p-6 bg-card/50">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-ink">
                  {item.q}
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
