import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Age Verification",
  description: "Verify that you are 18+ to access PredNim premium adult content.",
};

export default function VerifyAgePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-2xl px-5 sm:px-8 py-24">
          <div className="rounded-lg border border-line/50 bg-card/50 p-8">
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-6">
                <svg
                  className="h-8 w-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h1 className="font-display text-3xl font-bold text-ink mb-4">
                Age Verification Required
              </h1>

              <p className="text-muted mb-8 max-w-md">
                PredNim contains adult content (18+ only). By entering, you confirm that you are at least 18 years old and agree to our Terms of Service.
              </p>

              <div className="rounded-lg bg-accent/5 border border-accent/20 p-6 mb-8">
                <h2 className="font-semibold text-ink mb-3">What PredNim contains:</h2>
                <ul className="text-left text-sm text-muted space-y-2">
                  <li>• Erotic novels and romance books</li>
                  <li>• Mature graphic novels and comics</li>
                  <li>• Adult-oriented content (18+ only)</li>
                  <li>• Explicit material not suitable for minors</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Link
                  href="/"
                  className="block rounded-lg bg-accent px-6 py-3 text-sm font-bold text-on-accent transition hover:bg-accent-dim"
                >
                  I confirm I am 18+ and enter
                </Link>
                <a
                  href="https://google.com"
                  className="block rounded-lg border border-line/60 px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/50 hover:bg-accent/5"
                >
                  I am under 18, leave
                </a>
              </div>

              <p className="text-[12px] text-muted mt-8">
                By clicking "I confirm I am 18+", you acknowledge that you have read and agree to our{" "}
                <a href="#" className="text-accent hover:text-accent-dim">
                  Terms of Service
                </a>
                {" "}and{" "}
                <a href="#" className="text-accent hover:text-accent-dim">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
