export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-surface" />
        <div className="anim-glow absolute -left-[10%] top-[-40%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(61,220,106,0.15),transparent_70%)]" />
        <div className="absolute right-[-15%] top-[30%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(61,220,106,0.08),transparent_75%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 pt-16 pb-8 sm:px-8 sm:pt-24 sm:pb-12">
        <div className="max-w-2xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
              Content 18+ Only
            </span>
          </span>

          <h1 className="font-display mt-6 text-4xl sm:text-5xl leading-tight font-bold tracking-[-0.02em] text-ink">
            Unlimited adult books{" "}
            <span className="text-accent">
              & comics
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Discover exclusive erotic novels, romance, and mature comics created by our community. Discreet access, premium content. Read what you desire. From $100/month.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#pricing"
              className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-on-accent shadow-[0_10px_30px_-10px_rgba(61,220,106,0.4)] transition hover:bg-accent-dim"
            >
              View plans
            </a>
            <a
              href="/how-it-works"
              className="rounded-full border border-line/60 px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/50 hover:bg-accent/5"
            >
              How it works
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent">5,000+</span>
              <span className="text-xs text-muted">books available</span>
            </div>
            <div className="h-6 w-px bg-line/20" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent">$100</span>
              <span className="text-xs text-muted">from monthly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
