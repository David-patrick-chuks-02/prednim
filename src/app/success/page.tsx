"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function SuccessPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <>
        <SiteHeader />
        <main className="flex items-center justify-center min-h-[400px]">
          <div className="text-muted">Loading...</div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-2xl px-5 sm:px-8 py-24">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="font-display text-4xl font-bold text-ink mb-4">Payment Successful! ✨</h1>
            <p className="text-lg text-muted mb-8">Thank you for joining our community!</p>
          </div>

          {/* WhatsApp Section */}
          <div className="bg-accent/5 border border-accent/30 rounded-lg p-8 mb-8 text-center">
            <h2 className="font-display text-2xl font-bold text-ink mb-4">Get Your Books</h2>
            <p className="text-muted mb-6">Message us on WhatsApp to receive your book access and start reading immediately.</p>

            <a
              href="https://wa.me/2347014185686?text=Hi%20I%20just%20purchased%20a%20subscription%20plan.%20Please%20send%20me%20access%20to%20the%20books."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-dim text-on-accent font-bold py-4 px-8 rounded-lg transition mb-4 w-full sm:w-auto"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.994 1.505c-1.532.926-2.743 2.33-3.405 3.968-.661 1.638-.698 3.368-.1 5.02.598 1.651 1.745 3.036 3.232 3.976 1.488.94 3.236 1.376 5.023 1.376h.004c.993 0 1.953-.121 2.868-.358 1.769 1.447 2.932 2.319 3.635 2.843.281.224.657.408 1.074.463.417.056.844.062 1.23.01.762-.104 1.354-.451 1.744-1.028.39-.578.489-1.268.467-2.061-.022-.793-.145-1.73-.325-2.627-.18-.897-.452-1.79-.786-2.629-.333-.84-.749-1.622-1.237-2.322-.489-.7-1.048-1.318-1.67-1.837a9.803 9.803 0 001.537-6.908c-.133-1.638-.666-3.106-1.577-4.348-.911-1.242-2.14-2.154-3.565-2.696a9.871 9.871 0 00-4.961-.61" />
              </svg>
              Message on WhatsApp
            </a>

            <p className="text-sm text-muted">
              WhatsApp: <span className="font-semibold text-ink">+234 701 418 5686</span>
            </p>
          </div>

          {/* Info Box */}
          <div className="rounded-lg border border-line/50 bg-card/50 p-6 mb-8">
            <h3 className="font-display font-bold text-ink mb-3">What's Next?</h3>
            <ul className="space-y-2 text-muted text-sm">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">✓</span>
                <span>Message us on WhatsApp with your subscription details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">✓</span>
                <span>We'll send you instant access to your book library</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">✓</span>
                <span>Start reading on any device immediately</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">✓</span>
                <span>Enjoy unlimited community content</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="rounded-lg border border-accent/30 px-6 py-3 text-sm font-bold text-accent hover:bg-accent/10 transition text-center"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="rounded-lg bg-accent/15 px-6 py-3 text-sm font-bold text-accent hover:bg-accent/25 transition text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
