"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { PremiumBook } from "@/lib/premiumBooks";
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from "lucide-react";

const PDFViewer = dynamic(() => import("./pdf-viewer"), { ssr: false });

interface PremiumBookReaderProps {
  book: PremiumBook;
  onClose: () => void;
}

export function PremiumBookReaderV2({ book, onClose }: PremiumBookReaderProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handleNextPage = () => {
    if (currentPage < numPages) {
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
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="w-full h-full max-w-5xl bg-card rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-line/50 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-ink truncate">{book.title}</h2>
            <p className="text-xs text-muted mt-1">
              {currentPage} / {numPages}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              onClick={() => setScale(Math.max(0.5, scale - 0.1))}
              className="p-2 rounded hover:bg-accent/10 transition"
              title="Zoom out"
            >
              <ZoomOut size={18} />
            </button>

            <span className="text-xs text-muted min-w-12 text-center">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={() => setScale(Math.min(2, scale + 0.1))}
              className="p-2 rounded hover:bg-accent/10 transition"
              title="Zoom in"
            >
              <ZoomIn size={18} />
            </button>

            <button
              onClick={handleDownload}
              className="p-2 rounded hover:bg-accent/10 transition hidden sm:flex"
              title="Download"
            >
              <Download size={18} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-accent/10 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto bg-black/20 flex items-center justify-center p-4">
          <PDFViewer
            pdfUrl={book.pdfUrl}
            currentPage={currentPage}
            scale={scale}
            onDocumentLoad={(numPages: number) => {
              setNumPages(numPages);
              setIsLoading(false);
            }}
            isLoading={isLoading}
          />
        </div>

        {/* Navigation Footer */}
        <div className="border-t border-line/50 px-4 sm:px-6 py-3 sm:py-4 bg-card/50 flex items-center justify-between gap-3 flex-wrap">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="rounded-lg border border-line/60 px-3 sm:px-4 py-2 font-semibold text-sm text-ink transition hover:border-accent/50 hover:bg-accent/5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={numPages}
              value={currentPage}
              onChange={(e) => {
                const page = Math.max(1, Math.min(numPages, parseInt(e.target.value) || 1));
                setCurrentPage(page);
              }}
              className="w-14 px-2 py-1 text-sm text-center border border-line/50 rounded bg-background text-ink focus:outline-none focus:border-accent/50"
            />
            <span className="text-sm text-muted">/ {numPages}</span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === numPages}
            className="rounded-lg border border-line/60 px-3 sm:px-4 py-2 font-semibold text-sm text-ink transition hover:border-accent/50 hover:bg-accent/5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
