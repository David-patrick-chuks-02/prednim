import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Our story",
  description: "The story behind PredNim and our mission.",
};

export default function StoryPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24">
          <h1 className="font-display text-4xl font-bold text-ink mb-8">Our story</h1>
          <p className="text-muted">Our story of bringing unlimited books to readers everywhere coming soon.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
