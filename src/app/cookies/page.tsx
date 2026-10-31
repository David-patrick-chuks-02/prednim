import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie policy for PredNim.",
};

export default function CookiesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24">
          <h1 className="font-display text-4xl font-bold text-ink mb-8">Cookie Policy</h1>

          <div className="space-y-6 text-muted">
            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">What Are Cookies?</h2>
              <p>Cookies are small files stored on your device that help us provide a better experience. We use cookies to remember your preferences and keep you logged in.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Types of Cookies We Use</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Authentication Cookies:</strong> Keep you logged into your account</li>
                <li><strong>Preference Cookies:</strong> Remember your reading preferences and settings</li>
                <li><strong>Session Cookies:</strong> Track your activity during your visit</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use PredNim</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Essential vs Optional Cookies</h2>
              <p><strong>Essential cookies</strong> are required for PredNim to function properly. You cannot disable these.</p>
              <p className="mt-2"><strong>Optional cookies</strong> help us improve your experience. You can disable these in your browser settings.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Cookie Control</h2>
              <p>You can control cookies through your browser settings. Disabling cookies may affect some features of PredNim.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Third-Party Cookies</h2>
              <p>Payment processing through Bach may use cookies for transaction security. We do not allow other third parties to place tracking cookies.</p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
