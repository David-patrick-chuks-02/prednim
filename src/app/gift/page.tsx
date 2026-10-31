import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Gift membership",
  description: "Give the gift of unlimited books. Perfect for book lovers.",
};

export default function GiftPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24">
          <h1 className="font-display text-4xl font-bold text-ink mb-8">Gift a membership</h1>
          <p className="text-muted mb-6">Give the gift of unlimited books to the book lover in your life.</p>
          <div className="space-y-4 text-muted">
            <p>Gift memberships available in:</p>
            <ul className="space-y-2">
              <li>• 1 month - $100</li>
              <li>• 3 months - $300</li>
              <li>• 6 months - $500</li>
              <li>• 1 year - $1,000</li>
            </ul>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
