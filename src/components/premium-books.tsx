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
          {books.map((book) => (
            <button
              key={book.id}
              onClick={() => setSelectedBook(book)}
              className="group rounded-lg border border-line/50 bg-card/30 overflow-hidden hover:border-accent/50 hover:bg-card/50 transition-all duration-200 text-left"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-accent/10 to-accent/5 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2 p-4">
                    <div className="text-3xl">📖</div>
                    <div className="text-xs text-muted">{book.pages} pages</div>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-ink group-hover:text-accent transition line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-xs text-muted line-clamp-2">
                  {book.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-line/30">
                  <span className="text-xs text-muted">
                    {book.chapters} chapters
                  </span>
                  <span className="text-xs font-semibold text-accent">Read →</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
