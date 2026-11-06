"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

interface MarkdownReaderProps {
  filePath: string;
  title: string;
}

export function MarkdownReader({ filePath, title }: MarkdownReaderProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(filePath, {
          cache: "force-cache",
          headers: { "Accept": "text/markdown" }
        });
        if (!response.ok) throw new Error("Failed to load content");
        const text = await response.text();
        setContent(text);
      } catch (error) {
        setContent("# Error loading content\n\nCould not load the book content.");
        console.error("Markdown fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [filePath]);

  const renderedContent = useMemo(() => {
    if (!content) return null;

    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let buffer: string[] = [];

    const flushBuffer = () => {
      if (buffer.length === 0) return;
      const text = buffer.join("\n");
      if (text.trim()) {
        elements.push(
          <p key={`p-${elements.length}`} className="text-muted leading-relaxed mb-4">
            {text}
          </p>
        );
      }
      buffer = [];
    };

    lines.forEach((line, idx) => {
      if (line.startsWith("# ")) {
        flushBuffer();
        elements.push(
          <h1 key={`h1-${idx}`} className="text-3xl font-bold text-ink mb-4 mt-8">
            {line.replace("# ", "")}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        flushBuffer();
        elements.push(
          <h2 key={`h2-${idx}`} className="text-2xl font-bold text-ink mb-3 mt-6">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        flushBuffer();
        elements.push(
          <h3 key={`h3-${idx}`} className="text-xl font-semibold text-ink mb-2 mt-4">
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("- ")) {
        flushBuffer();
        elements.push(
          <li key={`li-${idx}`} className="ml-4 text-muted mb-1">
            {line.replace("- ", "")}
          </li>
        );
      } else if (line === "---") {
        flushBuffer();
        elements.push(<hr key={`hr-${idx}`} className="my-6 border-line/30" />);
      } else if (line.trim() === "") {
        if (buffer.length > 0) flushBuffer();
      } else {
        buffer.push(line);
      }
    });

    flushBuffer();
    return elements;
  }, [content]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-muted text-sm">Loading book content...</div>
      </div>
    );
  }

  return (
    <div className="prose prose-invert max-w-none text-sm text-ink space-y-4">
      {renderedContent}
    </div>
  );
}
