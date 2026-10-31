"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="rounded-lg border border-line/50 bg-card/50 p-6">
              <div className="text-sm text-muted uppercase font-semibold">Subscription</div>
              <div className="mt-3 text-2xl font-bold text-accent">Active</div>
              <div className="mt-2 text-xs text-muted">Premium access</div>
            </div>
            <div className="rounded-lg border border-line/50 bg-card/50 p-6">
              <div className="text-sm text-muted uppercase font-semibold">Books Read</div>
              <div className="mt-3 text-2xl font-bold text-ink">0</div>
              <div className="mt-2 text-xs text-muted">Get started today</div>
            </div>
            <div className="rounded-lg border border-line/50 bg-card/50 p-6">
              <div className="text-sm text-muted uppercase font-semibold">Library Access</div>
              <div className="mt-3 text-2xl font-bold text-ink">5,000+</div>
              <div className="mt-2 text-xs text-muted">Books available</div>
            </div>
          </div>

          {/* Featured Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Link
              href="/browse"
              className="group rounded-lg border border-line/50 bg-card/50 p-8 transition hover:border-accent/30 hover:bg-card/80"
            >
              <h3 className="font-display text-lg font-bold text-ink">Browse library</h3>
              <p className="mt-2 text-sm text-muted">Explore 5,000+ hand-picked books</p>
              <div className="mt-4 text-accent font-semibold">Start reading →</div>
            </Link>

            <div className="rounded-lg border border-accent/30 bg-accent/5 p-8">
              <h3 className="font-display text-lg font-bold text-ink">Your plan</h3>
              <p className="mt-2 text-sm text-muted">Premium subscription • Cancel anytime</p>
              <Link
                href="/account"
                className="mt-4 inline-block text-accent font-semibold hover:text-accent-dim"
              >
                Manage plan →
              </Link>
            </div>
          </div>

          {/* Reading Progress */}
          <div className="rounded-lg border border-line/50 bg-card/50 p-8">
            <h2 className="font-display text-xl font-bold text-ink mb-6">Continue reading</h2>
            <div className="text-center text-muted py-12">
              <p className="text-sm">No books in progress</p>
              <Link
                href="/browse"
                className="mt-4 inline-block text-accent font-semibold hover:text-accent-dim"
              >
                Browse books →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
