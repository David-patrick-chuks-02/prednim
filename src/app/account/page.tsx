"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LogOut, Send } from "lucide-react";

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [refundReason, setRefundReason] = useState("");
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchSubscription();
    }
  }, [user]);

  const fetchSubscription = async () => {
    try {
      const response = await fetch("/api/user/subscription");
      const data = await response.json();
      setSubscription(data.subscription || null);
    } catch (error) {
      console.error("Error fetching subscription:", error);
    } finally {
      setSubscriptionLoading(false);
    }
  };

  const handleRefundRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/refund-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.id,
          email: user?.email,
          reason: refundReason,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit refund request");
      }

      setMessage({ type: "success", text: "Refund request submitted! Our team will review it within 3-5 business days." });
      setRefundReason("");
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to submit refund request",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16">
          {/* Header */}
          <div className="mb-16">
            <Link
              href="/dashboard"
              className="text-accent text-sm font-semibold hover:text-accent/80 transition mb-6 inline-block"
            >
              ← Back to Library
            </Link>
            <h1 className="font-display text-4xl font-bold text-ink">Settings</h1>
            <p className="text-muted mt-2">Manage your account and reading preferences</p>
          </div>

          {/* Alert Message */}
          {message && (
            <div
              className={`mb-8 p-4 rounded-xl ${
                message.type === "error"
                  ? "bg-red-500/10 border border-red-500/20 text-red-600"
                  : "bg-green-500/10 border border-green-500/20 text-green-600"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Profile Section */}
          <div className="mb-16">
            <h2 className="font-display text-xl font-bold text-ink mb-6">Profile</h2>
            <div className="rounded-lg border border-line/50 bg-card/50 p-8">
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-semibold uppercase text-muted/70 tracking-wide">Name</label>
                  <p className="mt-2 text-ink text-lg">{user?.user_metadata?.full_name || "Not provided"}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-muted/70 tracking-wide">Email</label>
                  <p className="mt-2 text-ink text-lg">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Status Section */}
          <div className="mb-16">
            <h2 className="font-display text-xl font-bold text-ink mb-6">Subscription Status</h2>
            <div className="rounded-lg border border-line/50 bg-card/50 p-8">
              {subscriptionLoading ? (
                <p className="text-muted">Loading subscription information...</p>
              ) : subscription ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted/70 tracking-wide">Plan</label>
                      <p className="mt-2 text-ink text-lg capitalize font-semibold">
                        {subscription.plan_type === 'monthly' ? 'Monthly Plan' :
                         subscription.plan_type === 'sixmonth' ? '6-Month Plan' :
                         subscription.plan_type === 'annual' ? 'Annual Plan' : 'Free Plan'}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      subscription.status === 'active'
                        ? 'bg-green-500/10 text-green-600'
                        : 'bg-red-500/10 text-red-600'
                    }`}>
                      {subscription.status === 'active' ? '✓ Active' : 'Inactive'}
                    </div>
                  </div>
                  {subscription.current_period_end && subscription.status === 'active' && (
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted/70 tracking-wide">Expires</label>
                      <p className="mt-2 text-ink text-lg">
                        {new Date(subscription.current_period_end).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {subscription.plan_type === 'free' && (
                    <Link
                      href="/pricing"
                      className="inline-block mt-4 px-4 py-2 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent/90 transition text-sm"
                    >
                      Upgrade to Premium →
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted">You're currently on the free plan.</p>
                  <Link
                    href="/pricing"
                    className="inline-block px-4 py-2 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent/90 transition text-sm"
                  >
                    View Premium Plans →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Billing Section */}
          <div className="mb-16">
            <h2 className="font-display text-xl font-bold text-ink mb-6">Billing & Refunds</h2>
            <div className="rounded-lg border border-line/50 bg-card/50 p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-ink mb-3">Request a Refund</h3>
                  <p className="text-muted text-sm mb-4">
                    We offer a 30-day money-back guarantee. If you're not satisfied with your subscription, let us know below and we'll process your refund within 3-5 business days.
                  </p>
                  <form onSubmit={handleRefundRequest} className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-ink mb-2 block">Reason for refund</label>
                      <textarea
                        value={refundReason}
                        onChange={(e) => setRefundReason(e.target.value)}
                        placeholder="Tell us why you'd like a refund (optional)"
                        className="w-full px-4 py-3 rounded-lg border border-line bg-background text-ink placeholder-muted focus:outline-none focus:border-accent transition resize-none"
                        rows={4}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent/90 transition disabled:opacity-50"
                    >
                      <Send size={18} />
                      {isSubmitting ? "Submitting..." : "Submit Refund Request"}
                    </button>
                  </form>
                </div>

                <div className="border-t border-line/30 pt-6">
                  <Link
                    href="/refund-policy"
                    className="text-accent text-sm font-semibold hover:text-accent/80 transition inline-block"
                  >
                    View full Refund Policy →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Reading Preferences */}
          <div className="mb-16">
            <h2 className="font-display text-xl font-bold text-ink mb-6">Reading Experience</h2>
            <div className="rounded-lg border border-line/50 bg-card/50 p-8">
              <p className="text-muted mb-6">Your library is synced across all devices. Books you access are always current.</p>
              <Link
                href="/dashboard"
                className="text-accent text-sm font-semibold hover:text-accent/80 transition"
              >
                Browse Library →
              </Link>
            </div>
          </div>

          {/* About */}
          <div className="mb-16">
            <h2 className="font-display text-xl font-bold text-ink mb-6">About Prednim</h2>
            <div className="rounded-lg border border-line/50 bg-card/50 p-8 space-y-4">
              <p className="text-muted">Prednim is a curated collection of premium books for thoughtful readers. Our library features carefully selected titles across multiple genres.</p>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-accent text-sm hover:text-accent/80 transition">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-accent text-sm hover:text-accent/80 transition">
                  Terms of Service
                </Link>
                <Link href="/refund-policy" className="block text-accent text-sm hover:text-accent/80 transition">
                  Refund Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Sign Out */}
          <div className="border-t border-line/30 pt-8">
            <button
              onClick={() => {
                signOut();
                router.push("/");
              }}
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition font-semibold text-sm"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
