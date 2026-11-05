"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { createBrowserClient } from "@supabase/ssr";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BOOKS } from "@/lib/books";
import Image from "next/image";
import { BookReader } from "@/components/book-reader";
import { PremiumBooks } from "@/components/premium-books";

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState<typeof BOOKS[0] | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [subLoading, setSubLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) return;

      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data, error } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Subscription fetch error:", error);
        }

        setSubscription(data);
      } catch (error) {
        console.error("Subscription fetch error:", error);
      } finally {
        setSubLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  if (loading || subLoading) {
    return (
      <>
        <SiteHeader />
        <main className="flex items-center justify-center min-h-[400px]">
          <div className="text-muted">Loading your library...</div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const hasActiveSubscription = subscription && subscription.status === "active";

  return (
    <>
      {selectedBook && (
        <BookReader
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="font-display text-4xl font-bold text-ink">Your library</h1>
              <p className="mt-2 text-muted">Welcome, {user?.user_metadata?.full_name || "Reader"}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="rounded-lg border border-line/60 px-4 py-2 text-sm font-semibold text-ink transition hover:border-accent/50 hover:bg-accent/5"
            >
              Sign out
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-lg border border-line/50 bg-card/50 p-6">
              <div className="text-sm text-muted uppercase font-semibold">Subscription Status</div>
              <div className={`mt-3 text-2xl font-bold ${hasActiveSubscription ? "text-accent" : "text-muted"}`}>
                {hasActiveSubscription ? subscription.plan_type.toUpperCase() : "No Active Plan"}
              </div>
              <div className="mt-2 text-xs text-muted">
                {hasActiveSubscription ? "Premium access active" : "Choose a plan to get started"}
              </div>
            </div>
            {!hasActiveSubscription && (
              <div className="rounded-lg border border-accent/30 bg-accent/5 p-6">
                <div className="text-sm text-muted uppercase font-semibold">Get Access</div>
                <p className="mt-2 text-sm text-ink">Purchase a plan to access our community library</p>
                <a
                  href="/pricing"
                  className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-bold text-on-accent hover:bg-accent-dim transition"
                >
                  View plans →
                </a>
              </div>
            )}
          </div>

          {hasActiveSubscription && (
            <>
              {/* Featured Actions */}
              <div className="rounded-lg border border-accent/30 bg-accent/5 p-8 mb-12">
                <h3 className="font-display text-lg font-bold text-ink">Your plan</h3>
                <p className="mt-2 text-sm text-muted">
                  {subscription.plan_type === "monthly" && "Monthly subscription • $100/month"}
                  {subscription.plan_type === "sixmonth" && "6-Month subscription • $500 for 6 months"}
                  {subscription.plan_type === "annual" && "Annual subscription • $1000/year"}
                  {" "} • Cancel anytime
                </p>
                <p className="mt-2 text-xs text-muted">
                  Access until {new Date(subscription.current_period_end).toLocaleDateString()}
                </p>
                <Link
                  href="/account"
                  className="mt-4 inline-block text-accent font-semibold hover:text-accent-dim"
                >
                  Manage plan →
                </Link>
              </div>

              {/* Premium Books Section */}
              <div className="mb-12">
                <PremiumBooks userId={user?.id} />
              </div>

              {/* Books Grid */}
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold text-ink mb-6">Community Library</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {BOOKS.map((book) => (
                    <button
                      key={book.id}
                      onClick={() => setSelectedBook(book)}
                      className="group text-left transition-transform hover:scale-105"
                    >
                      <div className="relative mb-4 overflow-hidden rounded-lg bg-muted h-64">
                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-display font-bold text-ink group-hover:text-accent transition">{book.title}</h3>
                      <p className="text-sm text-muted">{book.author}</p>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {!hasActiveSubscription && (
            <div className="rounded-lg border border-line/50 bg-card/50 p-12 text-center">
              <h2 className="font-display text-2xl font-bold text-ink mb-4">Community Library</h2>
              <p className="text-muted mb-6">Unlock our exclusive community library by purchasing a subscription</p>
              <p className="text-sm text-muted mb-6">Access hundreds of books created by our community, available immediately upon subscription.</p>
              <a
                href="/pricing"
                className="inline-block rounded-lg bg-accent px-6 py-3 text-sm font-bold text-on-accent hover:bg-accent-dim transition"
              >
                Choose Your Plan
              </a>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
