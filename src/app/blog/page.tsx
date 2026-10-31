import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stories, recommendations, and book club picks from the PredNim team.",
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24">
          <h1 className="font-display text-4xl font-bold text-ink mb-8">Our blog</h1>
          <p className="text-muted">Stories, recommendations, and insights from the PredNim community coming soon.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
