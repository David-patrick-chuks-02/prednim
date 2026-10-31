import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for PredNim.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24">
          <h1 className="font-display text-4xl font-bold text-ink mb-8">Terms of Service</h1>

          <div className="space-y-6 text-muted">
            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Age Requirement</h2>
              <p>PredNim is exclusively for users 18 years of age or older. By using PredNim, you confirm that you are 18+.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Subscription Terms</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Choose monthly, 6-month, or annual plans</li>
                <li>Renews automatically unless cancelled</li>
                <li>Cancel anytime with no penalties</li>
                <li>Charges recur on the billing date</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Content Access</h2>
              <p>Your subscription grants you personal, non-commercial access to all PredNim books and comics. You may not redistribute, copy, or share content outside your account.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Account Responsibility</h2>
              <p>You are responsible for keeping your login credentials confidential. Do not share your account with others. Unauthorized sharing may result in account termination.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Cancellation</h2>
              <p>You can cancel your subscription anytime through your account settings. Cancellation takes effect at the end of your current billing period.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Content Rating</h2>
              <p>All content on PredNim is intended for mature audiences (18+). Content includes explicit sexual material, adult themes, and mature comics.</p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
