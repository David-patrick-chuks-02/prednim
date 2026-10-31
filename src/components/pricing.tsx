"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

const PLANS = [
  {
    name: "Monthly",
    price: 100,
    period: "per month",
    description: "Perfect for trying us out",
    features: [
      "Unlimited book access",
      "5,000+ titles in our library",
      "Offline reading",
      "Sync across devices",
      "Cancel anytime",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "6 Months",
    price: 500,
    period: "6 months",
    description: "Best value for committed readers",
    features: [
      "Unlimited book access",
      "5,000+ titles in our library",
      "Offline reading",
      "Sync across devices",
      "Priority support",
      "Exclusive author interviews",
      "15% savings vs monthly",
    ],
    cta: "Get started",
    highlighted: true,
  },
  {
    name: "Annual",
    price: 1000,
    period: "per year",
    description: "Maximum savings for book lovers",
    features: [
      "Unlimited book access",
      "5,000+ titles in our library",
      "Offline reading",
      "Sync across devices",
      "Priority support",
      "Exclusive author interviews",
      "Members-only book club",
      "33% savings vs monthly",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
];

export function Pricing() {
  const router = useRouter();
  const { user } = useAuth();

  const handleSelectPlan = () => {
    if (!user) {
      router.push("/signup");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <section id="pricing" className="scroll-mt-20 relative py-16 sm:py-24">
      {/* Background decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute left-[-10%] top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(61,220,106,0.08),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
            Unlimited access, discreet billing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-muted">
            Premium adult content. Choose your plan. Cancel anytime. 18+ only.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border transition-all ${
                plan.highlighted
                  ? "border-accent bg-gradient-to-b from-accent/5 to-surface shadow-lg shadow-accent/10 scale-105"
                  : "border-line/50 bg-card/50"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="text-[10px] font-semibold tracking-wide text-accent uppercase">
                      Most popular
                    </span>
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Name and Price */}
                <h3 className="font-display text-xl font-bold text-ink">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.description}</p>

                <div className="mt-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-accent">${plan.price}</span>
                    <span className="text-sm text-muted">/{plan.period}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleSelectPlan}
                  className={`mt-8 w-full rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    plan.highlighted
                      ? "bg-accent text-on-accent hover:bg-accent-dim shadow-lg shadow-accent/20"
                      : "border border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50"
                  }`}
                >
                  {plan.cta}
                </button>

                {/* Features List */}
                <div className="mt-8 space-y-4 border-t border-line/20 pt-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-muted">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted">
            All plans include a 7-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
