'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { PREMIUM_BOOKS } from '@/lib/premiumBooks';

export default function BookPage() {
  const [book, setBook] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // Find book by slug from URL params
    if (params?.slug) {
      const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
      const foundBook = PREMIUM_BOOKS.find(b => b.slug === slug);
      setBook(foundBook || null);
      setLoading(false);
    }
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          <p className="mt-4 text-muted">Loading book...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-ink mb-4">Book not found</h1>
          <Link href="/dashboard" className="text-accent hover:text-accent/80">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement('a');
    link.href = book.pdfUrl;
    link.download = `${book.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/80 backdrop-blur border-b border-line/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition w-fit"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Book Cover - Left */}
          <div className="lg:sticky lg:top-24">
            {book.coverUrl && (
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-line/20">
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>

          {/* Book Info - Right */}
          <div className="space-y-10">
            {/* Title */}
            <div>
              <h1 className="text-5xl font-bold text-ink mb-3">{book.title}</h1>
              <p className="text-accent font-semibold text-sm">⭐ Exclusive Premium Edition</p>
            </div>

            {/* Description - Main Focus */}
            <div className="space-y-6 border-t border-b border-line/30 py-8">
              <div>
                <h2 className="text-xl font-semibold text-ink mb-4">The Story</h2>
                <p className="text-muted leading-relaxed text-base">
                  {book.description}
                </p>
              </div>

            </div>

            {/* Download CTA - Single Button */}
            <div className="space-y-4 pt-6">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full px-8 py-4 rounded-xl bg-accent text-on-accent font-semibold hover:bg-accent/90 transition disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
              >
                <Download size={24} />
                {downloading ? 'Downloading...' : 'Download PDF'}
              </button>
              <p className="text-xs text-muted text-center">
                High-quality PDF • {book.pages} pages • Ready to read offline
              </p>
            </div>

            {/* Footer */}
            <p className="text-xs text-muted/60 pt-8">
              Exclusive premium content for Prednim members. © 2026 Prednim.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
