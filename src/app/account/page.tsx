"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LogOut } from "lucide-react";

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
