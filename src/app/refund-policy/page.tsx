import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund policy for Prednim premium book subscriptions.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24">
          <h1 className="font-display text-4xl font-bold text-ink mb-8">Refund Policy</h1>

          <div className="space-y-6 text-muted">
            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">30-Day Guarantee</h2>
              <p>We offer a 30-day money-back guarantee on all new subscriptions. If you're not satisfied with your Prednim membership within 30 days of your first payment, you're entitled to a full refund.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">How to Request a Refund</h2>
              <p>To request a refund:</p>
              <ol className="list-decimal list-inside space-y-2 mt-2">
                <li>Log into your Prednim account</li>
                <li>Navigate to Settings → Billing</li>
                <li>Click "Request Refund" under your subscription</li>
                <li>Select your reason and submit</li>
                <li>Our team will process your request within 3-5 business days</li>
              </ol>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Refund Timeline</h2>
              <p>Once approved, refunds are processed to your original payment method within 5-10 business days. Please note that your bank or card issuer may take an additional 1-3 business days to credit the funds to your account.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Eligibility</h2>
              <p>You are eligible for a refund if:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Your request is made within 30 days of your initial purchase</li>
                <li>You have not already received a refund on this account</li>
                <li>You provide a genuine reason for the refund request</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Non-Refundable Scenarios</h2>
              <p>We cannot process refunds in the following cases:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Requests made after 30 days from purchase</li>
                <li>Repeated refund requests from the same account</li>
                <li>Refunds already issued for the same transaction</li>
                <li>Requests for individual book downloads (books are part of your subscription)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Subscription Cancellation vs. Refund</h2>
              <p>A refund is different from cancellation. If you simply wish to cancel your subscription without requesting a refund, you can do so anytime in your account settings. You will keep access until the end of your current billing period.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Partial Refunds</h2>
              <p>For subscriptions active beyond the 30-day window, we may offer pro-rated refunds for unused subscription time, subject to our discretion. Contact our support team to discuss your specific situation.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Exceptions & Disputes</h2>
              <p>If your refund request is denied or you have concerns about a decision, please reach out to our support team within 14 days. We'll review your case and respond with a detailed explanation.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Contact & Support</h2>
              <p>For refund inquiries or to appeal a decision, contact us through the help centre in your account dashboard or email support@prednim.com with your order details.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink mb-3">Policy Updates</h2>
              <p>This refund policy is effective as of 2026. Prednim reserves the right to update this policy at any time. Changes will be communicated to users and take effect 30 days from notification.</p>
            </section>

            <div className="mt-8 pt-8 border-t border-line/30">
              <p className="text-sm text-muted/60">Last updated: November 2026</p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
