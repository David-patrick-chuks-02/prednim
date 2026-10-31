"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function AccountPage() {
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
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-12">Account settings</h1>

          {/* Profile Section */}
          <div className="mb-12">
            <h2 className="font-display text-xl font-bold text-ink mb-6">Profile</h2>
            <div className="rounded-lg border border-line/50 bg-card/50 p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-muted">Name</label>
                  <p className="mt-1 text-ink">{user?.user_metadata?.full_name || "Not provided"}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-muted">Email</label>
                  <p className="mt-1 text-ink">{user?.email}</p>
                </div>
                <button className="mt-4 rounded-lg border border-line/60 px-4 py-2 text-sm font-semibold text-ink transition hover:border-accent/50 hover:bg-accent/5">
                  Edit profile
                </button>
              </div>
            </div>
          </div>

          {/* Subscription Section */}
          <div className="mb-12">
            <h2 className="font-display text-xl font-bold text-ink mb-6">Subscription</h2>
            <div className="rounded-lg border border-accent/30 bg-accent/5 p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-muted">Current plan</label>
                  <p className="mt-1 text-lg font-bold text-accent">6-Month Plan</p>
                  <p className="text-xs text-muted mt-1">$500 every 6 months</p>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-muted">Status</label>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-ink font-semibold">Active</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-muted">Next billing date</label>
                  <p className="mt-1 text-ink">April 31, 2025</p>
                </div>
                <div className="flex gap-3 pt-4">
                  <Link
                    href="/pricing"
                    className="rounded-lg border border-accent/30 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent/10"
                  >
                    Change plan
                  </Link>
                  <Link
                    href="/cancel"
                    className="rounded-lg border border-danger/30 px-4 py-2 text-sm font-semibold text-danger transition hover:bg-danger/10"
                  >
                    Cancel subscription
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mb-12">
            <h2 className="font-display text-xl font-bold text-ink mb-6">Danger zone</h2>
            <div className="rounded-lg border border-danger/30 bg-danger/5 p-6">
              <p className="text-sm text-muted mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <button className="rounded-lg border border-danger/30 px-4 py-2 text-sm font-semibold text-danger transition hover:bg-danger/10">
                Delete account
              </button>
            </div>
          </div>

          {/* Sign Out */}
          <div>
            <button
              onClick={() => {
                signOut();
                router.push("/");
              }}
              className="rounded-lg bg-accent/15 px-6 py-3 text-sm font-semibold text-accent transition border border-accent/30 hover:bg-accent/25 hover:border-accent/50"
            >
              Sign out
            </button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
