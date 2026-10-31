import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Cancel membership",
  description: "Cancel your PredNim subscription anytime.",
};

export default function CancelPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24">
          <h1 className="font-display text-4xl font-bold text-ink mb-8">Cancel membership</h1>
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 mb-6">
            <p className="text-muted">We're sorry to see you go! Your membership can be cancelled anytime.</p>
          </div>
          <p className="text-muted">To cancel your subscription:</p>
          <ol className="list-decimal list-inside space-y-2 text-muted mt-4">
            <li>Log into your account</li>
            <li>Go to Account Settings</li>
            <li>Click "Cancel membership"</li>
            <li>Confirm cancellation</li>
          </ol>
          <p className="text-muted mt-6">Your access continues until the end of your billing period.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
