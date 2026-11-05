"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PremiumBook } from "@/lib/premiumBooks";
import { PremiumBookReader } from "./premium-book-reader";

interface PremiumBooksProps {
  userId?: string;
}

export function PremiumBooks({ userId }: PremiumBooksProps) {
  const [books, setBooks] = useState<PremiumBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<PremiumBook | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books/premium");

        if (!response.ok) {
          throw new Error("Failed to fetch premium books");
        }

        const data = await response.json();
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
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-8 text-muted">No premium books available yet.</div>
    );
  }

  return (
    <>
      {selectedBook && (
        <PremiumBookReader
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}

      <div>
        <h2 className="text-2xl font-bold text-ink mb-6">📚 Premium Library</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, idx) => {
            const gradients = [
              'from-purple-600 to-pink-600',
              'from-blue-600 to-cyan-600',
              'from-emerald-600 to-teal-600',
              'from-amber-600 to-orange-600',
              'from-rose-600 to-pink-600',
              'from-indigo-600 to-purple-600',
              'from-cyan-600 to-blue-600',
              'from-lime-600 to-emerald-600',
              'from-orange-600 to-amber-600',
              'from-pink-600 to-rose-600',
            ];
            const gradient = gradients[idx % gradients.length];

            return (
              <button
                key={book.id}
                onClick={() => setSelectedBook(book)}
                className="group rounded-lg border border-line/50 overflow-hidden hover:border-accent/50 transition-all duration-200 text-left hover:shadow-lg hover:shadow-accent/20"
              >
                <div className={`aspect-[3/4] bg-gradient-to-br ${gradient} relative overflow-hidden flex flex-col justify-between p-6`}>
                  <div>
                    <div className="text-4xl font-bold text-white/20 mb-4">✦</div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-white text-lg leading-tight line-clamp-3 mb-3">
                      {book.title}
                    </h3>
                    <p className="text-white/80 text-xs line-clamp-2">
                      {book.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-card/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">
                      {book.pages} pages
                    </span>
                    <span className="text-xs text-muted">
                      {book.chapters} chapters
                    </span>
                  </div>
                  <div className="text-right pt-2 border-t border-line/30">
                    <span className="text-xs font-semibold text-accent">Read →</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
