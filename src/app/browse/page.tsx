"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BOOKS } from "@/lib/books";
import { BookReader } from "@/components/book-reader";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function BrowsePage() {
  const [selectedBook, setSelectedBook] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleReadBook = (book: any) => {
    if (!user) {
      router.push("/signup");
      return;
    }
    setSelectedBook(book);
  };

  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
          <div className="mb-12">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink">Browse library</h1>
            <p className="mt-4 text-base text-muted">5,000+ hand-picked books for your reading pleasure</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {BOOKS.map((book) => (
              <div
                key={book.id}
                className="group overflow-hidden rounded-xl border border-line/50 bg-card/50 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-card/80 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className={`relative h-40 overflow-hidden rounded-t-lg ${book.cover}`}>
                  <div className="absolute inset-0 border-b border-line/20 flex items-center justify-center">
                    <div className="text-center px-3">
                      <div className="font-display text-sm font-bold text-muted line-clamp-3">
                        {book.title}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display font-bold text-ink line-clamp-2 text-sm">
                    {book.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{book.author}</p>

                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(book.rating) ? "text-accent" : "text-line/30"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 1.6l2.4 5 5.5.8-4 3.8.95 5.4L10 14.1 5.15 16.6 6.1 11.2l-4-3.8 5.5-.8L10 1.6z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-mono text-xs text-muted">{book.rating}</span>
                  </div>

                  <div className="mt-auto pt-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1 flex-1 rounded-full bg-line/30 overflow-hidden">
                        <div
                          className="h-full bg-accent"
                          style={{
                            width: `${Math.min((book.inStock / 50) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted min-w-fit">{book.inStock} in stock</span>
                    </div>

                    <button
                      onClick={() => handleReadBook(book)}
                      className="w-full rounded-lg bg-accent/15 px-3 py-2.5 text-xs font-semibold text-accent transition border border-accent/30 hover:bg-accent/25 hover:border-accent/50"
                    >
                      Read preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedBook && (
        <BookReader book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}

      <SiteFooter />
    </>
  );
}
