import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BooksGrid } from "@/components/books-grid";

export const metadata: Metadata = {
  title: "Browse books",
  description: "Browse our collection of 5,000+ hand-picked books available on PredNim.",
};

export default function BrowsePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <BooksGrid />
      </main>
      <SiteFooter />
    </>
  );
}
