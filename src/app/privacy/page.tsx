import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for PredNim.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24">
          <h1 className="font-display text-4xl font-bold text-ink mb-8">Privacy Policy</h1>

          <div className="space-y-6 text-muted">
            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Data Protection</h2>
              <p>PredNim is committed to protecting your privacy. We collect only essential information needed to provide our subscription service.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Information We Collect</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Email address and account information</li>
                <li>Payment information (processed securely by Bach)</li>
                <li>Reading history and preferences</li>
                <li>Device information for sync functionality</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Discreet Billing</h2>
              <p>We use generic billing descriptors on all transactions. Your statement will not reveal the nature of your subscription.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Data Security</h2>
              <p>All data is encrypted using industry-standard security protocols. We never share your information with third parties.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Contact</h2>
              <p>For privacy inquiries, use the help centre in your account dashboard.</p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
