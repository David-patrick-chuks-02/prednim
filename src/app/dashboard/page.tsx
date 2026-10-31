"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BOOKS } from "@/lib/books";
import Image from "next/image";

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState(null);

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-lg border border-line/50 bg-card/50 p-6">
              <div className="text-sm text-muted uppercase font-semibold">Subscription Status</div>
              <div className="mt-3 text-2xl font-bold text-accent">No Active Plan</div>
              <div className="mt-2 text-xs text-muted">Choose a plan to get started</div>
            </div>
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
          </div>

          {/* Featured Actions */}
          <div className="rounded-lg border border-accent/30 bg-accent/5 p-8 mb-12">
            <h3 className="font-display text-lg font-bold text-ink">Your plan</h3>
            <p className="mt-2 text-sm text-muted">Premium subscription • Cancel anytime</p>
            <Link
              href="/account"
              className="mt-4 inline-block text-accent font-semibold hover:text-accent-dim"
            >
              Manage plan →
            </Link>
          </div>

          {/* Library Section - Hidden without subscription */}
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
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
