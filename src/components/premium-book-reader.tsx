"use client";

import { useState } from "react";
import { PremiumBook } from "@/lib/premiumBooks";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";

interface PremiumBookReaderProps {
  book: PremiumBook;
  onClose: () => void;
}

export function PremiumBookReader({ book, onClose }: PremiumBookReaderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleNextPage = () => {
    if (currentPage < book.pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = book.pdfUrl;
    link.download = `${book.slug}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="w-full h-full max-w-6xl bg-card rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-line/50 px-6 py-4 flex items-center justify-between">
          <div className="flex-1">
            <h2 className="font-semibold text-ink">{book.title}</h2>
            <p className="text-xs text-muted mt-1">
              Page {currentPage} of {book.pages}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale(Math.max(0.5, scale - 0.1))}
              className="rounded px-3 py-2 text-sm font-medium hover:bg-accent/10 transition"
              title="Zoom out"
            >
              −
            </button>

            <span className="text-sm text-muted min-w-12 text-center">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={() => setScale(Math.min(2, scale + 0.1))}
              className="rounded px-3 py-2 text-sm font-medium hover:bg-accent/10 transition"
              title="Zoom in"
            >
              +
            </button>

            <div className="w-px h-6 bg-line/30"></div>

            <button
              onClick={handleDownload}
              className="rounded px-3 py-2 text-sm font-medium hover:bg-accent/10 transition flex items-center gap-2"
              title="Download PDF"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={onClose}
              className="rounded px-3 py-2 text-sm font-medium hover:bg-accent/10 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PDF Viewer Area */}
        <div className="flex-1 overflow-auto flex items-center justify-center bg-black/20 p-4">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center",
              transition: "transform 0.2s ease-out",
            }}
          >
            {/* Using iframe to embed PDF */}
            <iframe
              key={`${book.id}-page-${currentPage}`}
              src={`${book.pdfUrl}#page=${currentPage}`}
              className="w-screen h-screen max-w-4xl max-h-[600px] border border-line/30 rounded shadow-lg"
              title={book.title}
            />
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="border-t border-line/50 px-6 py-4 flex items-center justify-between bg-card/50">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="rounded-lg border border-line/60 px-4 py-2 font-semibold text-sm text-ink transition hover:border-accent/50 hover:bg-accent/5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={book.pages}
              value={currentPage}
              onChange={(e) => {
                const page = Math.max(1, Math.min(book.pages, parseInt(e.target.value) || 1));
                setCurrentPage(page);
              }}
              className="w-16 px-2 py-1 text-sm text-center border border-line/50 rounded bg-background text-ink focus:outline-none focus:border-accent/50"
            />
            <span className="text-sm text-muted">/ {book.pages}</span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === book.pages}
            className="rounded-lg border border-line/60 px-4 py-2 font-semibold text-sm text-ink transition hover:border-accent/50 hover:bg-accent/5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
