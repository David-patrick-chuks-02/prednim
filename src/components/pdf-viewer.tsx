"use client";

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

interface PDFViewerProps {
  pdfUrl: string;
  currentPage: number;
  scale: number;
  onDocumentLoad: (numPages: number) => void;
  isLoading: boolean;
}

export default function PDFViewer({
  pdfUrl,
  currentPage,
  scale,
  onDocumentLoad,
  isLoading,
}: PDFViewerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="text-muted text-sm">Loading PDF...</div>;
  }

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
      {isLoading && <div className="text-muted text-sm">Loading PDF...</div>}
      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }: { numPages: number }) => onDocumentLoad(numPages)}
        loading={<div className="text-muted text-sm">Loading...</div>}
        error={<div className="text-red-500 text-sm">Failed to load PDF</div>}
      >
        <Page
          pageNumber={currentPage}
          width={Math.min(600, typeof window !== "undefined" ? window.innerWidth - 40 : 600)}
          className="bg-white shadow-lg rounded"
        />
      </Document>
    </div>
  );
}
