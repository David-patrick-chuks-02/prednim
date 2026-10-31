"use client";

import { BOOKS } from "@/lib/books";

function BookCard({ book }: { book: typeof BOOKS[0] }) {
  const discount = book.originalPrice ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) : 0;

  return (
    <div className="group flex flex-col rounded-lg border border-line/40 bg-card/50 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-card/80 hover:shadow-lg hover:shadow-accent/5">
      {/* Book Cover */}
      <div className="relative h-40 overflow-hidden rounded-t-lg bg-gradient-to-br from-accent/10 to-accent-dim/10">
        <div className="absolute inset-0 border-b border-line/20 flex items-center justify-center">
          <div className="text-center px-3">
            <div className="font-display text-sm font-bold text-muted line-clamp-3">{book.title}</div>
          </div>
        </div>
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-accent/20 text-accent text-xs font-bold px-2 py-1 rounded border border-accent/40">
            -{discount}%
          </div>
        )}
        {book.tag && (
          <div className="absolute top-2 left-2 bg-accent/15 text-accent text-xs font-semibold px-2 py-0.5 rounded border border-accent/30">
            {book.tag}
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display font-bold text-ink line-clamp-2 text-sm">
          {book.title}
        </h3>
        <p className="mt-1 text-xs text-muted">{book.author}</p>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-3 w-3 ${i < Math.floor(book.rating) ? "text-accent" : "text-line/30"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 1.6l2.4 5 5.5.8-4 3.8.95 5.4L10 14.1 5.15 16.6 6.1 11.2l-4-3.8 5.5-.8L10 1.6z" />
              </svg>
            ))}
          </div>
          <span className="font-mono text-xs text-muted">{book.rating}</span>
        </div>

        {/* Read Button */}
        <button className="mt-auto pt-4 w-full rounded-lg bg-accent/15 px-3 py-2.5 text-xs font-semibold text-accent transition border border-accent/30 hover:bg-accent/25 hover:border-accent/50">
          Read now
        </button>
      </div>
    </div>
  );
}

export function BooksGrid() {
  return (
    <section id="shop" className="scroll-mt-20 relative">
      {/* Background decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute right-[-10%] top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(61,220,106,0.08),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
            Our collection
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted leading-relaxed">
            All books published exclusively by PredNim. Unlimited access to 5,000+ titles with any subscription plan.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {BOOKS.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-muted mb-4 text-sm">
            Browse all 5,000+ exclusive books with your subscription.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold text-on-accent shadow-[0_10px_30px_-10px_rgba(61,220,106,0.3)] transition hover:bg-accent-dim"
          >
            View plans →
          </a>
        </div>
      </div>
    </section>
  );
}
