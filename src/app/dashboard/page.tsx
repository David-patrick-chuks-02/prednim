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

          {/* Library Section */}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold text-ink mb-8">Your Library</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {BOOKS.map((book) => (
                <div
                  key={book.id}
                  className="group cursor-pointer rounded-lg border border-line/50 bg-card/50 overflow-hidden transition hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                >
                  <div className="relative h-48 overflow-hidden rounded-t-lg bg-gradient-to-br from-surface to-elevated">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-display font-bold text-ink text-xs line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted">{book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
