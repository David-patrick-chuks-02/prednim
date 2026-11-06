"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BOOKS } from "@/lib/books";
import { BookReader } from "@/components/book-reader";
import { PremiumBooks } from "@/components/premium-books";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState<typeof BOOKS[0] | null>(null);

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
          <div className="text-muted">Loading your library...</div>
        </main>
        <SiteFooter />
      </>
    );
  }

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
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
          {/* Header */}
          <div className="mb-20">
            <h1 className="font-display text-5xl font-bold text-ink mb-3">Your Library</h1>
            <p className="text-muted text-lg max-w-2xl">Welcome back, {user?.user_metadata?.full_name || "reader"}. Explore our collection of carefully curated books.</p>
            <Link
              href="/account"
              className="mt-6 inline-block text-accent text-sm font-semibold hover:text-accent/80 transition"
            >
              Profile & Settings →
            </Link>
          </div>

          {/* Premium Books - Hero Section */}
          <div>
            <PremiumBooks userId={user?.id} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
