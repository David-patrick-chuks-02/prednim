"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PremiumBook } from "@/lib/premiumBooks";

interface PremiumBooksProps {
  userId?: string;
}

export function PremiumBooks({ userId }: PremiumBooksProps) {
  const [books, setBooks] = useState<PremiumBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books/premium", {
          cache: "force-cache",
          headers: { "Accept": "application/json" }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch premium books");
        }

        setBooks(data.books);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load premium books"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted">Loading premium books...</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg bg-card/50 border border-line/50 animate-pulse h-80"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    const isSubscriptionError = error.includes("No active subscription");

    return (
      <div className={`rounded-lg border p-8 text-center ${
        isSubscriptionError
          ? "border-accent/20 bg-accent/5"
          : "border-red-500/20 bg-red-500/5"
      }`}>
        <h3 className="text-2xl font-semibold text-ink mb-2">
          {isSubscriptionError ? "📚 Unlock Premium Library" : "❌ Unable to Load"}
        </h3>
        <p className={`mb-8 max-w-md mx-auto text-lg ${
          isSubscriptionError ? "text-muted" : "text-red-600"
        }`}>
          {isSubscriptionError
            ? "Discover our exclusive collection of premium books. Choose a plan that works for you."
            : error}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/pricing"
            className={`px-8 py-3 rounded-lg font-semibold transition ${
              isSubscriptionError
                ? "bg-accent text-on-accent hover:bg-accent/90"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            {isSubscriptionError ? "View Plans" : "Try Again"}
          </Link>
          <Link
            href={isSubscriptionError ? "/how-it-works" : "/dashboard"}
            className="px-8 py-3 rounded-lg border border-line text-accent font-semibold hover:bg-card/50 transition"
          >
            {isSubscriptionError ? "Learn More" : "Go Back"}
          </Link>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-8 text-muted">No premium books available yet.</div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-ink mb-6">📚 Premium Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link
            key={book.id}
            href={`/book/${book.slug}`}
            className="group rounded-lg border border-line/50 overflow-hidden hover:border-accent/50 transition-all duration-200 text-left hover:shadow-lg hover:shadow-accent/20"
          >
            {book.coverUrl && (
              <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  quality={80}
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center">
                  <span className="text-sm text-white font-semibold">Read →</span>
                </div>
              </div>
            )}

            <div className="p-4 bg-card/50 space-y-2">
              <h3 className="font-semibold text-ink group-hover:text-accent transition line-clamp-2">
                {book.title}
              </h3>
              <p className="text-xs text-muted line-clamp-3">
                {book.description}
              </p>
              <div className="flex items-center justify-end pt-2 border-t border-line/30">
                <span className="text-xs font-semibold text-accent">Read →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
