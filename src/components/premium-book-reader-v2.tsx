"use client";

import { useState } from "react";
import { PremiumBook } from "@/lib/premiumBooks";
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from "lucide-react";

interface PremiumBookReaderProps {
  book: PremiumBook;
  onClose: () => void;
}

export function PremiumBookReaderV2({ book, onClose }: PremiumBookReaderProps) {
  const [scale, setScale] = useState(1);

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
            <p className="text-xs text-muted mt-1">{book.pages} pages</p>
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

        {/* PDF Viewer - Using iframe */}
        <div className="flex-1 overflow-auto bg-black/20 flex items-center justify-center p-4">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center",
              transition: "transform 0.2s ease-out",
            }}
          >
            <iframe
              src={book.pdfUrl}
              className="w-screen h-screen max-w-3xl max-h-[600px] border border-line/30 rounded shadow-lg bg-white"
              title={book.title}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-line/50 px-4 sm:px-6 py-3 sm:py-4 bg-card/50">
          <p className="text-xs text-muted text-center">
            PDF Viewer • Use your browser controls or the zoom buttons above to navigate
          </p>
        </div>
      </div>
    </div>
  );
}
