import { Wordmark } from "@/components/logo";

export function FinalCta() {
  return (
    <section id="pricing" className="relative isolate scroll-mt-20 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="anim-glow absolute left-1/2 top-1/2 h-[46vmax] w-[46vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(61,220,106,0.18),transparent_68%)]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="overflow-hidden rounded-3xl border border-line bg-card/70 px-6 py-14 text-center sm:px-14">
          <h2 className="font-display mx-auto max-w-2xl text-[clamp(2rem,4.6vw,3.1rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink">
            Ready to find the book you’ll{" "}
            <span className="text-accent">actually finish?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted">
            Stop buying books that sit on the shelf. Start building a reading list you look
            forward to.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#shop"
              className="rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-on-accent shadow-[0_10px_30px_-10px_rgba(61,220,106,0.6)] transition hover:bg-accent-dim"
            >
              Start browsing free
            </a>
            <a
              href="#help"
              className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink transition hover:border-accent/40 hover:text-accent"
            >
              Ask a bookseller
            </a>
          </div>

          <p className="mt-6 text-xs text-muted">
            Join <span className="font-semibold text-ink">10,000+ readers</span> who made the
            switch to <Wordmark className="text-[13px]" />. Free delivery on your first order.
          </p>
        </div>
      </div>
    </section>
  );
}
