'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PREMIUM_BOOKS } from '@/lib/premiumBooks';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function BookPage({ params }: PageProps) {
  const [book, setBook] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Find book by slug from params
    if (params?.slug) {
      const foundBook = PREMIUM_BOOKS.find(b => b.slug === params.slug);
      setBook(foundBook || null);
    }
  }, [params?.slug]);

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
    <div className="min-h-screen bg-gradient-to-b from-card/50 to-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/80 backdrop-blur border-b border-line/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent/90 transition disabled:opacity-50"
          >
            <Download size={18} />
            {downloading ? 'Downloading...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Book Cover */}
          <div className="md:col-span-1">
            {book.coverUrl && (
              <div className="sticky top-24">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg border border-line/30">
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full mt-4 px-4 py-3 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  {downloading ? 'Downloading...' : 'Download'}
                </button>
              </div>
            )}
          </div>

          {/* Book Info */}
          <div className="md:col-span-2 space-y-8">
            {/* Title & Meta */}
            <div>
              <h1 className="text-4xl font-bold text-ink mb-4">{book.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted">
                <span>📖 {book.chapters} Chapters</span>
                <span>📄 {book.pages} Pages</span>
                <span className="text-accent">⭐ Exclusive Premium Content</span>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-4 border-t border-line/30 pt-8">
              <h2 className="text-2xl font-bold text-ink">About This Book</h2>
              <p className="text-muted leading-relaxed text-lg">
                {book.description}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-6 bg-card/50 rounded-lg p-6 border border-line/30">
              <div>
                <h3 className="text-sm font-semibold text-muted mb-2">Format</h3>
                <p className="text-ink">PDF</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted mb-2">Publisher</h3>
                <p className="text-ink">Prednim © 2026</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted mb-2">Chapters</h3>
                <p className="text-ink">{book.chapters}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted mb-2">Pages</h3>
                <p className="text-ink">{book.pages}</p>
              </div>
            </div>

            {/* Download CTA */}
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-8 border border-accent/20">
              <h3 className="text-xl font-bold text-ink mb-2">Ready to Read?</h3>
              <p className="text-muted mb-6">
                Click the button below to download your copy and start reading instantly.
              </p>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="px-6 py-3 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent/90 transition disabled:opacity-50 flex items-center gap-2"
              >
                <Download size={18} />
                {downloading ? 'Downloading...' : 'Download PDF Now'}
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-muted text-center pt-8 border-t border-line/30">
              This is exclusive premium content for Prednim members only. © 2026 Prednim. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
