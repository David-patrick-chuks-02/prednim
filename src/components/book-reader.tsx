"use client";

import { useState } from "react";
import { Book } from "@/lib/books";

interface BookReaderProps {
  book: Book;
  onClose: () => void;
}

export function BookReader({ book, onClose }: BookReaderProps) {
  const [fontSize, setFontSize] = useState(16);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className="fixed inset-0 z-50 bg-surface">
      {/* Reader Toolbar */}
      <div className="sticky top-0 z-40 border-b border-line bg-elevated/90 backdrop-blur-sm px-4 sm:px-8 py-4">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="font-display font-bold text-ink truncate">{book.title}</h1>
            <p className="text-xs text-muted">{book.author}</p>
          </div>

          <div className="flex items-center gap-4 ml-4">
            {/* Font Size */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                className="rounded px-2 py-1 text-xs text-muted hover:text-accent"
              >
                A−
              </button>
              <span className="text-xs text-muted w-8 text-center">{fontSize}</span>
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                className="rounded px-2 py-1 text-xs text-muted hover:text-accent"
              >
                A+
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="rounded px-2 py-1 text-xs text-muted hover:text-accent"
            >
              {isDarkMode ? "☀" : "☾"}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="rounded px-3 py-1.5 text-sm font-semibold text-muted hover:text-accent border border-line/30 hover:border-accent/30"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Reader Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-8 py-12">
        <div
          className="prose prose-invert mx-auto"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: "1.8",
            maxWidth: "100%",
          }}
        >
          <div className="text-muted leading-relaxed space-y-6">
            <p>
              This is a preview of <strong>{book.title}</strong> by <strong>{book.author}</strong>.
            </p>
            <p>
              PredNim provides unlimited access to this book and 5,000+ others. You can read on any device, save your
              progress, and highlight passages.
            </p>
            <p>Features available when you subscribe:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Full access to all 5,000+ exclusive titles</li>
              <li>Offline reading on any device</li>
              <li>Highlight and note taking</li>
              <li>Reading progress tracking</li>
              <li>Sync across all your devices</li>
              <li>Discreet billing and privacy</li>
            </ul>
            <p className="pt-4 border-t border-line/30">
              <strong>Ready to start reading?</strong> Subscribe today for unlimited access to our complete library.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
