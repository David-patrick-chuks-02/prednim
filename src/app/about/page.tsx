import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "About PredNim",
  description: "Learn about our mission to bring great books to readers everywhere.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24">
          <h1 className="font-display text-4xl font-bold text-ink mb-8">About PredNim</h1>

          <div className="space-y-6 text-muted">
            <p>
              PredNim was founded on a simple belief: everyone deserves access to great books, regardless of budget or location.
            </p>
            <p>
              We curate our collection with care, selecting books that matter—stories that will change the way you see the world, books you'll actually finish.
            </p>
            <p>
              Our team of passionate readers works around the clock to bring you the best selection of contemporary fiction, timeless classics, thought-provoking non-fiction, and everything in between.
            </p>
            <p>
              With PredNim, you get unlimited access to over 5,000 hand-picked titles for just $100 a month. Read on any device, offline or online, cancel anytime.
            </p>
          </div>

          <div className="mt-12 pt-12 border-t border-line/30">
            <h2 className="font-display text-2xl font-bold text-ink mb-6">Our values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Curation", desc: "We don't do quantity. Every book in our library is hand-picked." },
                { title: "Accessibility", desc: "Great books should be available to everyone, everywhere." },
                { title: "Community", desc: "We build connections between readers and celebrate the love of reading." },
              ].map((v) => (
                <div key={v.title} className="border border-line/30 rounded-lg p-6 bg-card/50">
                  <h3 className="font-bold text-ink mb-2">{v.title}</h3>
                  <p className="text-sm text-muted">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
