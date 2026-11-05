"use client";

import { useState } from "react";
import { PremiumBook } from "@/lib/premiumBooks";
import { X, Download, Book } from "lucide-react";
import { MarkdownReader } from "./markdown-reader";

interface PremiumBookReaderProps {
  book: PremiumBook;
  onClose: () => void;
}

export function PremiumBookReaderV2({ book, onClose }: PremiumBookReaderProps) {
  const [mode, setMode] = useState<"read" | "pdf">("read");

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
        <div className="border-b border-line/50 px-4 sm:px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-ink truncate">{book.title}</h2>
            <p className="text-xs text-muted mt-1">{book.pages} pages • {book.chapters} chapters</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Toggle */}
            <div className="flex items-center border border-line/50 rounded-lg p-1 bg-card/50">
              <button
                onClick={() => setMode("read")}
                className={`px-3 py-1.5 rounded text-xs font-medium transition flex items-center gap-2 ${
                  mode === "read"
                    ? "bg-accent/20 text-accent"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Book size={14} />
                <span className="hidden sm:inline">Read</span>
              </button>
              <button
                onClick={() => setMode("pdf")}
                className={`px-3 py-1.5 rounded text-xs font-medium transition flex items-center gap-2 ${
                  mode === "pdf"
                    ? "bg-accent/20 text-accent"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Download size={14} />
                <span className="hidden sm:inline">PDF</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-accent/10 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {mode === "read" ? (
            <div className="p-6 sm:p-8 max-w-2xl mx-auto">
              <MarkdownReader
                filePath={`${book.pdfUrl.split(".")[0]}/content.md`}
                title={book.title}
              />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <div className="text-center space-y-4">
                <p className="text-muted mb-6">PDF Preview</p>
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent-dim transition"
                >
                  📥 Download PDF
                </button>
                <p className="text-xs text-muted mt-4">
                  Click above to download the full PDF to your device
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-line/50 px-4 sm:px-6 py-3 bg-card/50">
          <p className="text-xs text-muted text-center">
            {mode === "read"
              ? "Scroll to read • Switch to PDF mode to download"
              : "PDF mode • Click Download to save the book to your device"}
          </p>
        </div>
      </div>
    </div>
  );
}
