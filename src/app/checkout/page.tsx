"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const PLANS = {
  monthly: { name: "Monthly", price: 100, period: "per month" },
  sixmonth: { name: "6 Months", price: 500, period: "for 6 months" },
  annual: { name: "Annual", price: 1000, period: "per year" },
};

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof PLANS>("sixmonth");
  const [processing, setProcessing] = useState(false);

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

  const plan = PLANS[selectedPlan];

  const handleCheckout = async () => {
    setProcessing(true);
    // In a real app, this would integrate with Stripe/Paddle
    // For now, just redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-2xl px-5 sm:px-8 py-12">
          <Link href="/pricing" className="text-accent hover:text-accent-dim text-sm font-semibold mb-8 inline-block">
            ← Back to pricing
          </Link>

          <h1 className="font-display text-3xl font-bold text-ink mb-8">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan Selection */}
            <div className="md:col-span-2">
              <h2 className="font-display text-lg font-bold text-ink mb-4">Select plan</h2>
              <div className="space-y-3">
                {(Object.entries(PLANS) as Array<[keyof typeof PLANS, typeof PLANS[keyof typeof PLANS]]>).map(
                  ([key, plan]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedPlan(key)}
                      className={`w-full rounded-lg border p-4 text-left transition ${
                        selectedPlan === key
                          ? "border-accent bg-accent/10"
                          : "border-line/50 hover:border-accent/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-ink">{plan.name}</div>
                          <div className="text-sm text-muted">{plan.period}</div>
                        </div>
                        <div className="text-2xl font-bold text-accent">${plan.price}</div>
                      </div>
                    </button>
                  )
                )}
              </div>

              {/* Payment Form */}
              <div className="mt-8">
                <h2 className="font-display text-lg font-bold text-ink mb-4">Payment details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Cardholder name</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-line bg-input px-4 py-2.5 text-ink"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Card number</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-line bg-input px-4 py-2.5 text-ink"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Expiry</label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-line bg-input px-4 py-2.5 text-ink"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">CVC</label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-line bg-input px-4 py-2.5 text-ink"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="sticky top-20 rounded-lg border border-line/50 bg-card/50 p-6">
                <h3 className="font-display font-bold text-ink mb-4">Order summary</h3>

                <div className="space-y-3 border-b border-line/30 pb-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Subscription</span>
                    <span className="text-ink font-semibold">${plan.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Tax</span>
                    <span className="text-ink font-semibold">$0</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-bold text-ink">Total</span>
                  <span className="text-2xl font-bold text-accent">${plan.price}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={processing}
                  className="w-full rounded-lg bg-accent px-4 py-3 text-sm font-bold text-on-accent transition hover:bg-accent-dim disabled:opacity-50"
                >
                  {processing ? "Processing..." : "Complete purchase"}
                </button>

                <p className="mt-4 text-xs text-muted text-center">
                  Your subscription includes 7-day free trial. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
