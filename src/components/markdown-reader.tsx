"use client";

import { useEffect, useState } from "react";

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
        const response = await fetch(filePath);
        if (!response.ok) throw new Error("Failed to load content");
        const text = await response.text();
        setContent(text);
      } catch (error) {
        setContent("# Error loading content\n\nCould not load the book content.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [filePath]);

  if (loading) {
    return <div className="text-muted text-sm">Loading...</div>;
  }

  return (
    <div className="prose prose-invert max-w-none text-sm text-ink">
      {content.split("\n").map((line, idx) => {
        if (line.startsWith("# ")) {
          return (
            <h1 key={idx} className="text-2xl font-bold text-ink mb-4 mt-8">
              {line.replace("# ", "")}
            </h1>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={idx} className="text-xl font-bold text-ink mb-3 mt-6">
              {line.replace("## ", "")}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3 key={idx} className="text-lg font-semibold text-ink mb-2 mt-4">
              {line.replace("### ", "")}
            </h3>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <li key={idx} className="ml-4 text-muted">
              {line.replace("- ", "")}
            </li>
          );
        }
        if (line === "---") {
          return <hr key={idx} className="my-6 border-line/30" />;
        }
        if (line.trim() === "") {
          return <div key={idx} className="h-2" />;
        }
        return (
          <p key={idx} className="text-muted leading-relaxed mb-3">
            {line}
          </p>
        );
      })}
    </div>
  );
}
