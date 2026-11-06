"use client";

import { useState } from "react";
import { PremiumBook } from "@/lib/premiumBooks";
import { X, Download } from "lucide-react";
import Image from "next/image";

interface PremiumBookReaderProps {
  book: PremiumBook;
  onClose: () => void;
}

export function PremiumBookReaderV2({ book, onClose }: PremiumBookReaderProps) {

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = book.pdfUrl;
    link.download = `${book.slug}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="w-full h-full max-w-4xl bg-card rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-line/50 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-ink truncate">{book.title}</h2>
            <p className="text-xs text-muted mt-1">{book.pages} pages • {book.chapters} chapters</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-accent/10 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Preview Section */}
        <div className="flex-1 overflow-auto flex flex-col items-center justify-center p-6 sm:p-8 bg-black/20">
          <div className="text-center space-y-6 max-w-md">
            {book.coverUrl && (
              <div className="relative w-full h-96">
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  priority
                />
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-ink mb-2">{book.title}</h3>
              <p className="text-sm text-muted mb-4">{book.description}</p>
            </div>

            <button
              onClick={handleDownload}
              className="w-full px-6 py-3 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent/90 transition flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download PDF
            </button>

            <p className="text-xs text-muted">
              {book.pages} pages • {book.chapters} chapters
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-line/50 px-4 sm:px-6 py-3 bg-card/50">
          <p className="text-xs text-muted text-center">
            Click the button above to download your book
          </p>
        </div>
      </div>
    </div>
  );
}
